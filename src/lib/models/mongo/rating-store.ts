import type { Rating } from "$lib/types/boardbuddy-types";
import { RatingMongoose } from "./rating";
import { serialize } from "$lib/util";

export const ratingStore = {
  async addRating(ratingData: Rating): Promise<Rating | null> {
    try {
      const rating = await RatingMongoose.create(ratingData);
      return serialize(rating);
    } catch (error) {
      console.error('Error adding new rating:', error);
      return null;
    }
  },

  async getRatingsByLocationId(locationId: string): Promise<Rating[]> {
    try {
      const ratings = await RatingMongoose.find({ locationId }).lean<Rating[]>();
      return serialize(ratings);
    } catch (error) {
      console.error('Error fetching ratings by location ID:', error);
      return [];
    }
  },

  async getRatingsByUserId(userId: string): Promise<Rating[]> {
    try {
      const ratings = await RatingMongoose.find({ userId }).lean<Rating[]>();
      return serialize(ratings);
    } catch (error) {
      console.error('Error fetching ratings by user ID:', error);
      return [];
    }
  },

  async updateRating(updatedRating: Rating): Promise<void> {
    try {
      await RatingMongoose.findByIdAndUpdate(updatedRating._id, updatedRating, { new: true });
    } catch (error) {
      console.error('Error updating rating with ID:', updatedRating._id, error);
    }
  }
};
