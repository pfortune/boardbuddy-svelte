import { error } from '@sveltejs/kit';
import type { Action, Actions } from '@sveltejs/kit';
import { locationStore } from '$lib/models/mongo/location-store';
import { gameStore } from '$lib/models/mongo/game-store';
import { imageStore } from '$lib/models/mongo/image-store';

export async function load({ params }) {
    const { id } = params;

    try {
        const location = await locationStore.getLocationById(id);
        const images = await imageStore.getImagesByLocationId(id);
        
        if (!location) {
            throw error(404, `No location found with ID ${id}`);
        }
        return {
            location,
            images
        };
    } catch (err) {
        throw error(500, `Failed to fetch location: ${err.message}`);
    }
}

export const actions: Actions = {
    add: async ({ request, params }): Promise<Action> => {
      try {
        const formData = await request.formData();
        const title = formData.get('title')?.toString();
        const age = formData.get('age')?.toString();
        const duration = formData.get('duration')?.toString();
        const minPlayers = formData.get('minPlayers')?.toString();
        const maxPlayers = formData.get('maxPlayers')?.toString();
        const locationId = params.id; 

        // Validate required fields
        if (!title || !age || !duration || !minPlayers || !maxPlayers || !locationId) {
          return { status: 400, errors: { message: "All fields are required, including location ID" } };
        }

        const gameData = {
          title,
          age: parseInt(age),
          duration: parseInt(duration),
          minPlayers: parseInt(minPlayers),
          maxPlayers: parseInt(maxPlayers)
        };

        const game = await gameStore.addGame(locationId, gameData);

        if (!game) {
          return { status: 500, errors: { message: "Failed to add game" } };
        }

        return {
            status: 303,
            headers: {
              'Location': `/location/${locationId}`
            }
          };
      } catch (error) {
        console.error("Error adding game:", error);
        return { status: 500, errors: { message: "Internal server error" } };
      }
    },
    image: async ({ request, params, locals }) => {
      const formData = await request.formData();
      const imageUrls = JSON.parse(formData.get('imageUrls'));

      try {
          const images = await imageStore.addImages(params.id, locals.session?.userId, imageUrls);
          return { status: 200, body: { images } };
      } catch (err) {
          console.error("Error adding images:", err);
          return { status: 500, errors: { message: "Internal server error" } };
      }
    },
    delete_game: async({ request, params }) => {
      const formData = await request.formData();
      
      const gameToDelete = formData.get('id');
      console.log("Deleting game:", gameToDelete);
      if (!gameToDelete) {
        return { status: 400, errors: { message: "Game ID is missing" } };
      }
  
      try {
        await gameStore.deleteGame(gameToDelete.toString());
        return { status: 303, headers: { Location: '/dashboard' } }; // Redirect after delete
      } catch (error) {
        console.error("Error deleting game:", error);
        return { status: 500, errors: { message: "Failed to delete game" } };
      }
    },
    delete_image: async ({ request, params }) => {
      const formData = await request.formData();
      const imageId = formData.get("imageId");
  
      if (typeof imageId === "string") {
        await imageStore.deleteImage(imageId);
      }
  
      return { success: true };
    }
  };
