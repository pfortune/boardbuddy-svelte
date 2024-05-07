/**
 * Schema for User entities with basic personal and authentication information.
 *
 * @module User
 * @author Peter Fortune
 * @date 04/03/2024
 */

import type { User } from "$lib/types/boardbuddy-types";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  clerkUserId: String,
  permission: String
});

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

export const UserMongoose = mongoose.models.User || model("User", userSchema);