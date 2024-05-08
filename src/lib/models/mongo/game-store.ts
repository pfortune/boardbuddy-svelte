/**
 * Handles CRUD operations for Game data in MongoDB.
 * Includes functionality for adding, retrieving, updating, and deleting games,
 * with special handling for association to locations.
 *
 * @module gameStore
 * @author Peter Fortune
 * @date 04/03/2024
 * @see Game Model for game data structure and associations.
 */

import type { Game } from "$lib/types/boardbuddy-types";
import { GameMongoose } from "./game";

export const gameStore = {
  async getAllGames(): Promise<Game[]> {
    return GameMongoose.find().lean<Game[]>();
  },

  async addGame(locationId: string, gameData: Game): Promise<Game | null> {
    const game = new GameMongoose({
      ...gameData,
      locationid: locationId
    });
    const gameObj = await game.save();
    return this.getGameById(gameObj._id);
  },

  async getGamesByLocationId(locationId: string): Promise<Game[]> {
    return GameMongoose.find({ locationid: locationId }).lean<Game[]>();
  },

  async gameCount(): Promise<number> {
    const result = await GameMongoose.aggregate([{ $count: "totalGames" }]);
    return result.length > 0 ? result[0].totalGames : 0;
  },

  async getGameById(id: string): Promise<Game | null> {
    return GameMongoose.findOne({ _id: id }).lean<Game>();
  },

  async deleteGame(id: string): Promise<void> {
    try {
      await GameMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.error("Error deleting game with ID", id, error);
    }
  },

  async updateGame(id: string, updatedGameData: Partial<Game>): Promise<void> {
    const game = await GameMongoose.findById(id);
    if (!game) return;
    Object.assign(game, updatedGameData);
    await game.save();
  },

  async deleteAllGames(): Promise<void> {
    await GameMongoose.deleteMany({});
  }
};
