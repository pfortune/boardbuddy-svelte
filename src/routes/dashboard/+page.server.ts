import { locationStore } from "$lib/models/mongo/location-store";
import type { PageServerLoad, Actions, Action } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const user = {
    role: locals.session?.claims.metadata.role
  };

  let locations = [];

  if (user.role === "admin") {
    locations = await locationStore.getAllLocations();
  } else {
    locations = await locationStore.getLocationsByUserId(locals.session?.userId);
  }

  return {
    user,
    locations
  };
};

export const actions: Actions = {
  add: async ({ request, locals }): Promise<Action> => {
    try {
      const formData = await request.formData();
      const title = formData.get('title')?.toString();
      const category = formData.get('category')?.toString();
      const x = parseFloat(formData.get('x')?.toString() || '0');
      const y = parseFloat(formData.get('y')?.toString() || '0');
      const userId = locals.session?.userId;

      console.log("Received userId:", userId);  

      if (!title || !category || !userId) {
        return { status: 400, errors: { message: "Required fields are missing" } };
      }

      const location = {
        title,
        category,
        x,
        y,
        userId  
      };

      const addedLocation = await locationStore.addLocation(location);
      if (addedLocation) {
        return { status: 303, headers: { Location: '/dashboard' } };
      } else {
        return { status: 500, errors: { message: "Failed to add location" } };
      }
    } catch (error) {
      console.error("Error adding location:", error);
      return { status: 500, errors: { message: "Internal server error" } };
    }
  }
};
