/**
 * Location model schema definition.
 * Defines structure for location data including title, category, coordinates, and user association.
 *
 * @module Location
 * @author Peter Fortune
 * @date 04/03/2024
 * @see Location Model for the structure of location data.
 */

import type { Location } from "$lib/types/boardbuddy-types";
import mongoose, { Schema, model } from "mongoose";

const locationSchema = new Schema<Location>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  img: String,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

export const LocationMongoose = mongoose.models.Location || model("Location", locationSchema);
