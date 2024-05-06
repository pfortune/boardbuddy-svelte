import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({locals}) => {
    const userRole = locals.session?.claims.metadata.role; 

    return {
        userRole
    };
};