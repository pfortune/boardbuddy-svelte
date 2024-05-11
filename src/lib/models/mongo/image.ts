/**
 * Image model schema definition.
 * Defines structure for image data including img url, user association, location association and optional creation data.
 *
 * @module Image
 * @author Peter Fortune
 * @date 04/03/2024
 * @see Location Model for the structure of image data.
 */

import mongoose, { Schema, model } from "mongoose";
import type { Image } from "$lib/types/boardbuddy-types";

const imageSchema = new Schema<Image>({
  imgUrl: { type: String, required: true },
  userId: { type: String, required: true },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export const ImageMongoose = mongoose.models.Image || model("Image", imageSchema);