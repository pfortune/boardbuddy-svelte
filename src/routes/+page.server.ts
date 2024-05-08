import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({locals}) => {

    const user = {
        user: locals.session?.userId,
        firstName: locals.session?.claims.first_name,
        role: locals.session?.claims.metadata.role
    }; 

    console.log("src/+page.server.ts: ", user);

    return {
        user
    };
};