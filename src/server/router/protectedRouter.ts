import { createRouter } from './context';

export function createProtectedRouter() {
    return createRouter().middleware(({ ctx, next }) => {
        if (!ctx.session) {
            throw new Error('UNAUTHORIZED');
        }
        if (!ctx.session.user) {
            throw new Error('UNAUTHORIZED');
        }
        return next({
            ctx: {
                ...ctx,
                session: {
                    ...ctx.session,
                    user: {
                        ...ctx.session.user,
                    },
                },
            },
        });
    });
}
