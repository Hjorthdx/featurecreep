import { TRPCError } from '@trpc/server';
import { createRouter } from '../context';
import { z } from 'zod';

export const taskRouter = createRouter()
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
    .query('getTasks', {
        async resolve({ ctx }) {
            return await ctx.prisma.task.findMany({
                where: {
                    userId: ctx.session.user.id,
                },
            });
        },
    })
    .query('getTaskById', {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.task.findFirst({
                where: {
                    id: input.id,
                },
            });
        },
    })
    .mutation('createTask', {
        input: z.object({
            name: z.string().min(1, 'Task name must be at least 1 character long'),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.task.create({
                data: {
                    name: input.name,
                    userId: ctx.session.user.id,
                },
            });
        },
    })
    .mutation('updateTask', {
        input: z.object({
            id: z.string(),
            completed: z.boolean(),
            pomodoroTimerId: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.task.update({
                where: {
                    id: input.id,
                },
                data: {
                    completed: input.completed,
                    pomodoroTimerId: input.pomodoroTimerId,
                },
            });
        },
    });
