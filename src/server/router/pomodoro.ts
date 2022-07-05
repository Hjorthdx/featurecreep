import { createRouter } from './context';
import { z } from 'zod';

export const pomodoroRouter = createRouter()
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
    .mutation('startPomodoro', {
        input: z.object({
            workDuration: z.number(),
            breakDuration: z.number(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.pomodoro.create({
                data: {
                    createdAt: new Date(),
                    workDuration: input.workDuration,
                    breakDuration: input.breakDuration,
                },
            });
        },
    });
