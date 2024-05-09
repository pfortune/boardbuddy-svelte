import type { Location } from "$lib/types/boardbuddy-types";
import { LocationMongoose } from "./location";
import { gameStore } from "./game-store";

export const locationStore = {
  async getAllLocations(): Promise<Location[]> {
    try {
      const locations = await LocationMongoose.find().lean();
      for (const location of locations) {
        location.games = await gameStore.getGamesByLocationId(location._id.toString());
      }
      return JSON.parse(JSON.stringify(locations)); 
    } catch (error) {
      console.error("Error fetching all locations:", error);
      return [];
    }
  },

  async getLocationById(id: string): Promise<Location | null> {
    try {
      const location = await LocationMongoose.findById(id).lean();
      if (location) {
        location.games = await gameStore.getGamesByLocationId(id);
        return JSON.parse(JSON.stringify(location)); 
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
        location.games = await gameStore.getGamesByLocationId(location._id.toString());
      }
      return JSON.parse(JSON.stringify(locations)); 
    } catch (error) {
      console.error("Error fetching locations by user ID:", error);
      return [];
    }
  },

  async getLocationCategories(): Promise<string[]> {
    try {
      const categories = await LocationMongoose.distinct("category");
      return JSON.parse(JSON.stringify(categories));
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
      console.log("Attempting to add location with data:", location);
      const locationObj = await LocationMongoose.create(location);
      console.log("Added location with ID:", locationObj._id);
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
  }
};
