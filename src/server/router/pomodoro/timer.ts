import { TRPCError } from '@trpc/server';
import { createRouter } from '../context';
import { z } from 'zod';
import { createProtectedRouter } from '../protectedRouter';

export const timerRouter = createProtectedRouter().mutation('createTimer', {
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
