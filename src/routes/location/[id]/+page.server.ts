import { error } from '@sveltejs/kit';
import { locationStore } from '$lib/models/mongo/location-store';
import { gameStore } from '$lib/models/mongo/game-store';

export async function load({ params }) {
    const { id } = params;

    try {
        const location = await locationStore.getLocationById(id);
        
        if (!location) {
            throw error(404, `No location found with ID ${id}`);
        }
        return {
            location
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
    }
  };
