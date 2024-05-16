import mongoose, { Schema, model } from "mongoose";
import type { Rating } from "$lib/types/boardbuddy-types";


const ratingSchema = new Schema<Rating>({
  rating: { type: Number, required: true },
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

export const RatingMongoose = mongoose.models.Rating || model("Rating", ratingSchema);
