import { createRouter } from './context';
import { z } from 'zod';

export const pomodoroRouter = createRouter().mutation('createTimer', {
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
