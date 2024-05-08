import { locationStore } from '$lib/models/mongo/location-store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    const user = {
        user: locals.session?.userId,
        role: locals.session?.claims.metadata.role
    }; 

    console.log("src/dashboard/+page.server.ts: ", user);

    // Initialize locations array
    let locations = [];

    // Conditionally fetch locations based on the user's role
    if (user.role === 'admin') {
        locations = await locationStore.getAllLocations();
    } else {
        locations = await locationStore.getLocations(locals.session?.userId);
    }

    return {
        user,
        locations
    };
};
