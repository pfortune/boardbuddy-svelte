import { dbConnect } from "$lib/models/db";
import type { Handle } from "@sveltejs/kit";
import { sequence } from '@sveltejs/kit/hooks';
import { handleClerk } from 'clerk-sveltekit/server';
import { CLERK_SECRET_KEY } from '$env/static/private';

// Connect to the database when the server starts.
dbConnect().catch(err => {
  console.error("Failed to connect to the database:", err);
});

const clerkHandler = handleClerk(CLERK_SECRET_KEY, {
    debug: true,                  // Enable debug to see more detailed error messages
    protectedPaths: [
      '/dashboard', 
      '/profile', 
      '/admin', 
      '/game', 
      '/search',
      '/location', 
      '/about'
    ],   // Specify paths that require user to be authenticated
    signInUrl: '/login'         // Redirect to this URL if the user is not authenticated
});

export const handle: Handle = sequence(
  clerkHandler,
  async ({ event, resolve }) => {
    // You can add more middleware here if needed
    return await resolve(event);
  }
);
