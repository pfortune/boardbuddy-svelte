import { dbConnect } from "$lib/models/db";
import type { Handle } from "@sveltejs/kit";

// Connect to the database when the server starts.
dbConnect().catch(err => {
  console.error("Failed to connect to the database:", err);
});

export const handle: Handle = async ({ event, resolve }) => {
  return await resolve(event);
};
