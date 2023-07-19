import { createRouter } from './router/context';
import superjson from 'superjson';
import { TRPCError } from '@trpc/server';

const t = createRouter().create({
    // Optional:
    transformer: superjson,
    // Optional:
    errorFormatter(opts) {
        const { shape } = opts;
        return {
            ...shape,
            data: {
                ...shape.data,
            },
        };
    },
});

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

const isLoggedIn = middleware(async (opts) => {
    const { ctx } = opts;
    if (!ctx.session) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    if (!ctx.session.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return opts.next({
        ctx: {
            session: {
                user: ctx.session.user,
            }
        }
    })
})

export const protectedProcedure = publicProcedure.use(isLoggedIn);