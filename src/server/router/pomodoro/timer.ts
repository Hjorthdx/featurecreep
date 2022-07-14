import { TRPCError } from '@trpc/server';
import { createRouter } from '../context';
import { z } from 'zod';

export const timerRouter = createRouter()
    .middleware(async ({ ctx, next }) => {
        // Any queries or mutations after this middleware will
        // raise an error unless there is a current session
        if (!ctx.session) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        if (!ctx.session.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        // We need to do this because else TS won't understand that the middleware have now ensured that session and session user it not null.
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
    })
    .mutation('createTimer', {
        input: z.object({
            mode: z.string(), // How can I make this my custom type? 'work' | 'break' | 'longBreak'
            createdAt: z.date(),
            duration: z.number(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.pomodoroTimer.create({
                data: {
                    mode: input.mode,
                    createdAt: input.createdAt,
                    duration: input.duration,
                    userId: ctx.session.user.id,
                },
            });
        },
    });
