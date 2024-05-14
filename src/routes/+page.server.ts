import type { PageServerLoad } from "./$types";
import { locationStore } from "$lib/models/mongo/location-store";

export const load: PageServerLoad = async ({ locals }) => {

  const locations = await locationStore.getAllLocations();

  const user = {
    user: locals.session?.userId,
    firstName: locals.session?.claims.first_name,
    role: locals.session?.claims.metadata.role
  };

  return {
    user,
    locations
  };
};