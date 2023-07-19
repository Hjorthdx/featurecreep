import { z } from 'zod';
import { router, protectedProcedure } from '../../trpc';

export const universityRouter = router({
    getSemester: protectedProcedure.input(z.object({
        semester: z.number(),
    })).query(async ({ input, ctx }) => {
        return await ctx.prisma.semester.findFirst({
            where: {
                number: input.semester
            }
        });
    }),
    getSemesterInRange: protectedProcedure.input(z.object({
        lower: z.number(),
        upper: z.number(),
    })).query(async ({ input, ctx }) => {
        return await ctx.prisma.semester.findMany({
            where: {
                number: {
                    gte: input.lower,
                    lte: input.upper,
                },
            }
        });
    }),
});