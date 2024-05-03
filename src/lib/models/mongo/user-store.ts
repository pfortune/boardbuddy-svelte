/**
 * Interface for CRUD operations on User data in MongoDB.
 * Supports retrieving all users, finding by ID or email, adding, and deleting users.
 *
 * @module userStore
 * @author Peter Fortune
 * @date 04/03/2024
 * @see User Model for user data structure.
 */

import type { User } from "$lib/types/boardbuddy-types";
import { UserMongoose } from './user';

export const userStore = {
  async getAllUsers(): Promise<User[] | null> {
    const users = await UserMongoose.find().lean<User[]>();
    return users;
  },

  async getUserById(id: string): Promise<User | null> {
    if (!id) return null;
 
    const user = await UserMongoose.findOne({ _id: id }).lean<User>();
    return user;
  },

  async addUser(user: User): Promise<User | null> {
    const newUser = new UserMongoose(user);
    const userObj = await newUser.save();
    return await this.getUserById(userObj._id);
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserMongoose.findOne({ email: email }).lean<User>();
    return user;
  },

  async updateUser(id: string, updatedUser: User): Promise<User | null> {
    const user = await UserMongoose.findOne({ _id: id });
    if (!user) return null;
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    return await user.save();
  },

  async deleteUserById(id: string): Promise<void> {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("Error deleting user with ID", id, error);
    }
  },

  async deleteAll(): Promise<void> {
    await UserMongoose.deleteMany({});
  }
};