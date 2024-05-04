/**
 * Provides a set of asynchronous functions to interact with location data in a MongoDB database.
 * These functions allow you to retrieve all locations, a location by its ID or category, 
 * add a new location, and delete a location either by its ID or delete all locations.
 * It integrates with a separate `gameMongoStore` to associate games with specific locations.
 *
 * @module locationStore
 * @author Peter Fortune
 * @date 04/03/2024
 * @see Location Model for the structure of location data.
 * @see locationStore for how games are associated with locations.
 */

import type { Location } from "$lib/types/boardbuddy-types";
import { LocationMongoose } from './location';
import { gameStore } from "./game-store";

export const locationStore = {
  async getAllLocations(): Promise<Location[]> {
    try {
      const locations = await LocationMongoose.find().lean<Location[]>();
      for (const location of locations) {
        location.games = await gameStore.getGamesByLocationId(location._id.toString());
      }
      return locations;
    } catch (error) {
      console.error("Error fetching all locations:", error);
      return [];
    }
  },

  async getLocationById(id: string): Promise<Location | null> {
    if (!id) return null;
    const location = await LocationMongoose.findOne({ _id: id }).lean<Location>();
    if (location) {
        location.games = await gameStore.getGamesByLocationId(id);
    }
    return location;
  },

  async locationStats(): Promise<{ _id: string; count: number }[]> {
    return LocationMongoose.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
  },

  async getLocationCategories(): Promise<string[]> {
    try {
      const categories = await LocationMongoose.distinct("category");
      return categories;
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

  async addLocation(location: Location): Promise<Location | null> {
    const newLocation = new LocationMongoose(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id.toString());
  },

  async deleteLocationById(id: string): Promise<void> {
    try {
      await LocationMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.error("Error deleting location with ID", id, error);
    }
  },

  async updateLocation(updatedLocation: Location): Promise<void> {
    const location = await LocationMongoose.findOne({ _id: updatedLocation._id });
    if (!location) return;
    location.title = updatedLocation.title;
    location.img = updatedLocation.img;
    await location.save();
  },

  async deleteAllLocations(): Promise<void> {
    await LocationMongoose.deleteMany({});
  },
};