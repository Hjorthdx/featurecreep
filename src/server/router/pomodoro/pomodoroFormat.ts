import { TRPCError } from '@trpc/server';
import { createRouter } from '../context';
import { z } from 'zod';

export const pomodoroFormatRouter = createRouter()
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
    .query('getAllOfUsersPomodoroFormats', {
        input: z.object({
            userId: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.pomodoroFormat.findMany({ where: { userId: input.userId } });
        },
    })
    .query('getSelectedPomodoroFormat', {
        input: z.object({
            pomodoroFormatId: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.pomodoroFormat.findFirst({ where: { id: input.pomodoroFormatId } });
        },
    })
    .mutation('createPomodoroFormat', {
        input: z.object({
            name: z.string(),
            workDuration: z.string(),
            breakDuration: z.string(),
            longBreakDuration: z.string(),
            autoStartTimer: z.boolean(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.pomodoroFormat.create({
                data: {
                    userId: ctx.session.user.id,
                    name: input.name,
                    workDuration: input.workDuration,
                    breakDuration: input.breakDuration,
                    longBreakDuration: input.longBreakDuration,
                    autoStartTimer: input.autoStartTimer,
                },
            });
        },
    })
    .mutation('updatePomodoroFormat', {
        input: z.object({
            id: z.string(),
            name: z.string(),
            workDuration: z.string(),
            breakDuration: z.string(),
            longBreakDuration: z.string(),
            autoStartTimer: z.boolean(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.pomodoroFormat.update({
                where: { id: input.id },
                data: {
                    name: input.name,
                    workDuration: input.workDuration,
                    breakDuration: input.breakDuration,
                    longBreakDuration: input.longBreakDuration,
                    autoStartTimer: input.autoStartTimer,
                },
            });
        },
    })
    .mutation('updateUsersSelectedPomodoroFormat', {
        input: z.object({
            pomodoroFormatId: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.user.updateMany({
                where: { id: ctx.session.user.id },
                data: {
                    selectedPomodoroFormatId: input.pomodoroFormatId,
                },
            });
        },
    });
