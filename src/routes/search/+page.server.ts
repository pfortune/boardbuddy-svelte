import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({locals}) => {

    const user = {
        user: locals.session?.userId,
        email: locals.session?.claims.email,
        firstName: locals.session?.claims.first_name,
        lastName: locals.session?.claims.last_name,
        role: locals.session?.claims.metadata.role
    }; 

    console.log("src/search/+page.server.ts: ", user);
    return {
        user
    };
};