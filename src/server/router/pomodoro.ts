import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';

export const pomodoroRouter = createRouter()
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
                },
            });
        },
    })
    .middleware(async ({ ctx, next }) => {
        // Any queries or mutations after this middleware will
        // raise an error unless there is a current session
        if (!ctx.session) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        return next();
    })
    .query('getUsersSelectedPomodoroFormat', {
        async resolve({ ctx }) {},
    })
    .query('getPomodoroOptionsFromUser', {
        input: z.object({
            userId: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.pomodoroFormat.findMany({ where: { userId: input.userId } });
        },
    })
    .mutation('createPomodoroFormat', {
        input: z.object({
            name: z.string(),
            workDuration: z.number(),
            breakDuration: z.number(),
            longBreakDuration: z.number(),
        }),
        async resolve({ input, ctx }) {
            console.log('resolve');
            // I'm pretty sure this can't be undefined because of the middleware above
            // But I don't think trpc can determine that ?? I guess idk.
            if (ctx.session && ctx.session.user) {
                console.log('in if statement');
                console.log('name', input.name);
                console.log('workDuration', input.workDuration);
                console.log('breakDuration', input.breakDuration);
                console.log('longBreakDuration', input.longBreakDuration);
                return await ctx.prisma.pomodoroFormat.create({
                    data: {
                        userId: ctx.session.user.id,
                        name: input.name,
                        workDuration: input.workDuration,
                        breakDuration: input.breakDuration,
                        longBreakDuration: input.longBreakDuration,
                    },
                });
            }
        },
    });

/*
.query('getAll', {
        async resolve({ ctx }) {
            return await ctx.prisma.pomodoro.findMany();
        },
    })
    .query('getById', {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.pomodoro.findFirst({
                where: {
                    id: input.id,
                },
            });
        },
    })
    */
