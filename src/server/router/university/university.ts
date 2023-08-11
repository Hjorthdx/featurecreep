import { z } from 'zod';
import { router, publicProcedure } from '../../trpc';

export const universityRouter = router({
    getSemester: publicProcedure
        .input(
            z.object({
                semester: z.number(),
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.semester.findFirst({
                where: {
                    number: input.semester,
                },
            });
        }),
    getSemesterInRange: publicProcedure
        .input(
            z.object({
                lower: z.number(),
                upper: z.number(),
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.semester.findMany({
                where: {
                    number: {
                        gte: input.lower,
                        lte: input.upper,
                    },
                },
            });
        }),
});
