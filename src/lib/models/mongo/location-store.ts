import type { Location } from "$lib/types/boardbuddy-types";
import { LocationMongoose } from "./location";
import { gameStore } from "./game-store";
import { serialize } from "$lib/util";

export const locationStore = {
  async getAllLocations(): Promise<Location[]> {
    try {
      // Sort locations by createdAt in descending order
      const locations = await LocationMongoose.find().sort({ createdAt: -1 }).lean();
  
      for (const location of locations) {
        location.games = await gameStore.getGamesByLocationId(location._id);
      }
  
      return serialize(locations); 
    } catch (error) {
      console.error("Error fetching all locations:", error);
      return [];
    }
  },

  async getLocationById(id: string): Promise<Location | null> {
    try {
      const location = await LocationMongoose.findById(id).lean();
      if (location) {
        location.games = await gameStore.getGamesByLocationId(location._id);
        return serialize(location); 
      }
      return null;
    } catch (error) {
      console.error("Error fetching location by ID:", error);
      return null;
    }
  },

  async getLocationsByUserId(userId: string): Promise<Location[]> {
    try {
      const locations = await LocationMongoose.find({ userId }).lean();
      for (const location of locations) {
        location.games = await gameStore.getGamesByLocationId(location._id);
      }
      return serialize(locations); 
    } catch (error) {
      console.error("Error fetching locations by user ID:", error);
      return [];
    }
  },

  async getLocationCategories(): Promise<string[]> {
    try {
      const categories = await LocationMongoose.distinct("category");
      return serialize(categories);
    } catch (error) {
      console.error("Error fetching location categories:", error);
      return [];
    }
  },

  async getLocationsByCategory(category: string): Promise<Location[]> {
    try {
      const locations = await LocationMongoose.find({ category }).lean<Location[]>();
      for (const location of locations) {
        location.games = await gameStore.getGamesByLocationId(location._id.toString());
      }
      return locations;
    } catch (error) {
      console.error("Error fetching locations by category:", error);
      return [];
    }
  },

  async getLocations(userId: string): Promise<Location[]> {
    try {
      const locations = await LocationMongoose.find({ userId }).lean<Location[]>();
      return locations;
    } catch (error) {
      console.error("Error fetching locations by user ID:", error);
      return [];
    }
  },
  
  async addLocation(location: Location): Promise<Location | null> {
    try {
      const locationObj = await LocationMongoose.create(location);
      return await this.getLocationById(locationObj._id.toString());
    } catch (error) {
      console.error("Error adding new location:", error);
      return null;
    } 
  }
  ,

  async deleteLocationById(id: string): Promise<void> {
    try {
      await LocationMongoose.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error deleting location with ID", id, error);
    }
  },

  async updateLocation(updatedLocation: Location): Promise<void> {
    try {
      await LocationMongoose.findByIdAndUpdate(updatedLocation._id, updatedLocation, { new: true });
    } catch (error) {
      console.error("Error updating location with ID:", updatedLocation._id, error);
    }
  },

  async deleteAllLocations(): Promise<void> {
    try {
      await LocationMongoose.deleteMany({});
    } catch (error) {
      console.error("Error deleting all locations:", error);
    }
  },

  async getGamesCountByLocation(): Promise<{ location: string, gameCount: number }[]> {
    return await LocationMongoose.aggregate([
      {
        $lookup: {
          from: "games",
          localField: "_id",
          foreignField: "locationid",
          as: "games"
        }
      },
      {
        $project: {
          _id: 0,
          location: "$title",
          category: "$category",
          gameCount: { $size: "$games" }
        }
      }
    ]);
  },

  async getAverageGamesByCategory(): Promise<{ category: string, averageGames: number }[]> {
    return await LocationMongoose.aggregate([
      {
        $lookup: {
          from: "games",
          localField: "_id",
          foreignField: "locationid",
          as: "games"
        }
      },
      {
        $group: {
          _id: "$category",
          totalGames: { $sum: { $size: "$games" } },
          locationCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          averageGames: { $divide: ["$totalGames", "$locationCount"] }
        }
      }
    ]);
  },

  async getLocationCreationTrend(): Promise<{ day: string, count: number }[]> {
    const trendData = await LocationMongoose.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Filter for the last 7 days
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      },
      {
        $project: {
          _id: 0,
          day: "$_id",
          count: "$count"
        }
      }
    ]);

    const completeTrendData = [];
    const currentDate = new Date(new Date().setDate(new Date().getDate() - 3));
    const endDate = new Date();
    
    let trendIndex = 0;
    while (currentDate <= endDate) {
      const currentDateString = currentDate.toISOString().split('T')[0];
      if (trendData[trendIndex] && trendData[trendIndex].day === currentDateString) {
        completeTrendData.push(trendData[trendIndex]);
        trendIndex++;
      } else {
        completeTrendData.push({ day: currentDateString, count: 0 });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calculate average daily increase
    const counts = completeTrendData.map(d => d.count);
    const totalDays = counts.length;
    const totalIncrease = counts.reduce((sum, count, index) => {
      if (index > 0) {
        return sum + (count - counts[index - 1]);
      }
      return sum;
    }, 0);
    const averageDailyIncrease = totalIncrease / (totalDays - 1);
    console.log("Average Daily Increase:", averageDailyIncrease);

    // Project future values for the next 5 days
    const projectedData = [];
    let lastCount = counts[counts.length - 1] || 0;
    for (let i = 1; i <= 5; i++) {
      lastCount = Math.max(0, Math.round(lastCount + averageDailyIncrease));
      const projectedDay = new Date();
      projectedDay.setDate(new Date().getDate() + i);
      projectedData.push({
        day: projectedDay.toISOString().split('T')[0], // Format as YYYY-MM-DD
        count: lastCount
      });
    }

    const combinedData = [...completeTrendData, ...projectedData];
    console.log("Combined Trend Data with Projections:", combinedData);
    return combinedData;
  }
};