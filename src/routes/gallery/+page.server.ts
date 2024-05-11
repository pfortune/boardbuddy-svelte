import { error } from '@sveltejs/kit';
import { imageStore } from '$lib/models/mongo/image-store';

export async function load() {

    try {
        const images = await imageStore.getAllImages();

        return {
            images
        };
    } catch (err) {
        throw error(500, `Failed to fetch images: ${err.message}`);
    }
}