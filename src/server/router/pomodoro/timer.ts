import { z } from 'zod';
import { router, protectedProcedure } from '../../trpc';

export const timerRouter = router({
    createTimer: protectedProcedure.input(z.object({
        mode: z.string(), // How can I make this my custom type? 'work' | 'break' | 'longBreak'
        createdAt: z.date(),
        duration: z.number(),
    })).mutation(async ({ input, ctx }) => {
        return await ctx.prisma.pomodoroTimer.create({
            data: {
                mode: input.mode,
                createdAt: input.createdAt,
                duration: input.duration,
                userId: ctx.session.user.id,
            },
        });
    }),
});