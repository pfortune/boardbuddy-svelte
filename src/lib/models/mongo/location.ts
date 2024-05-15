/**
 * Location model schema definition.
 * Defines structure for location data including title, category, coordinates, user association, and optional image.
 *
 * @module Location
 * @author Peter Fortune
 * @date 04/03/2024
 * @see Location Model for the structure of location data.
 */

import mongoose, { Schema, model } from "mongoose";
import type { Location } from "$lib/types/boardbuddy-types";

const locationSchema = new Schema<Location>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const LocationMongoose = mongoose.models.Location || model("Location", locationSchema);
