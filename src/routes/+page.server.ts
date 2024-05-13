import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = ({ locals }) => {
  const user = {
    user: locals.session?.userId,
    firstName: locals.session?.claims.first_name,
    role: locals.session?.claims.metadata.role
  };

  return {
    user
  };
};
