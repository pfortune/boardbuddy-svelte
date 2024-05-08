import { locationStore } from '$lib/models/mongo/location-store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {

    const user = {
        user: locals.session?.userId,
        role: locals.session?.claims.metadata.role
    }; 

    console.log("src/dashboard/+page.server.ts: ", user);

    return {
        user,
        locations: await locationStore.getAllLocations()
    };
};