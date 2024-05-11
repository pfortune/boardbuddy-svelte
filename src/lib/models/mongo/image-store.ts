/**
 * Handles CRUD operations for Image data in MongoDB.
 * Includes functionality for adding, retrieving, updating, and deleting images,
 * with special handling for association to locations.
 *
 * @module imageStore
 * @author Peter Fortune
 * @date 11/05/2024
 * @see Image Model for image data structure and associations.
 */

import type { Image } from "$lib/types/boardbuddy-types";
import { ImageMongoose } from "./image";
import { serialize } from "$lib/util";

export const imageStore = {
    async getAllImages(): Promise<Image[]> {
        const images = await ImageMongoose.find().lean<Image[]>();
        return serialize(images);
    },

    async addImages(locationId: string, userId: string, imageUrls: string[]): Promise<Image[]> {
        const images = imageUrls.map((imgUrl) => ({
            imgUrl,
            userId,
            locationid: locationId
        }));

        const result = await ImageMongoose.insertMany(images);

        return serialize(result);
    },

    async getImagesByLocationId(locationId: string): Promise<Image[]> {
        const images = await ImageMongoose.find({ locationid: locationId }).lean();
        return serialize(images);
    },
};