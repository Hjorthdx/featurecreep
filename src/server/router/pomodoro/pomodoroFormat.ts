import { z } from 'zod';
import { createProtectedRouter } from '../protectedRouter';

export const pomodoroFormatRouter = createProtectedRouter()
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
