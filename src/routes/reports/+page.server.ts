import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
  const user = {
    role: locals.session?.claims.metadata.role
  };

  console.log("src/reports/+page.server.ts: ", user);
  return {
    user
  };
};
