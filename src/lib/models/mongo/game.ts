/**
 * Schema definition for Game entities, including details and location linkage.
 *
 * @module Game
 * @author Peter Fortune
 * @date 04/03/2024
 */

import mongoose, { Schema, model } from "mongoose";
import type { Game } from "$lib/types/boardbuddy-types";

const gameSchema = new Schema<Game>({
    title: { type: String, required: true },
    age: { type: Number, required: true },
    minPlayers: { type: Number, required: true },
    maxPlayers: { type: Number, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: true
    }
});

export const GameMongoose = mongoose.models.Game || model<Game>("Game", gameSchema);
