import { z } from 'zod';
import { router, protectedProcedure } from '../../trpc';

export const pomodoroFormatRouter = router({
    getAllOfUsersPomodoroFormats: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.pomodoroFormat.findMany({
                where: {
                    userId: input.userId,
                },
            });
        }),
    getSelectedPomodoroFormat: protectedProcedure
        .input(
            z.object({
                pomodoroFormatId: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.pomodoroFormat.findFirst({ where: { id: input.pomodoroFormatId } });
        }),
    createPomodoroFormat: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                workDuration: z.string(),
                breakDuration: z.string(),
                longBreakDuration: z.string(),
                autoStartTimer: z.boolean(),
            })
        )
        .mutation(async ({ input, ctx }) => {
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
        }),
    updatePomodoroFormat: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                workDuration: z.string(),
                breakDuration: z.string(),
                longBreakDuration: z.string(),
                autoStartTimer: z.boolean(),
            })
        )
        .mutation(async ({ input, ctx }) => {
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
        }),
    updateUsersSelectedPomodoroFormat: protectedProcedure
        .input(
            z.object({
                pomodoroFormatId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            return await ctx.prisma.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    selectedPomodoroFormatId: input.pomodoroFormatId,
                },
            });
        }),
});
