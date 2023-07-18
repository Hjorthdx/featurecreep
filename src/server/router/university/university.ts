import { z } from 'zod';
import { createRouter } from '../context';

export const universityRouter = createRouter().query('getSemester', {
    input: z.object({
        semester: z.number(),
    }),
    async resolve({ input, ctx }) {
        return await ctx.prisma.semester.findFirst({
            where: {
                number: input.semester
            }
        });
    }
}).query('getSemesterInRange', {
    input: z.object({
        lower: z.number(),
        upper: z.number(),
    }),
    async resolve({ input, ctx }) {
        const x = await ctx.prisma.semester.findMany({
            where: {
                number: {
                    gte: input.lower,
                    lte: input.upper,
                },
            }
        })
        x.map((semester) => {
            console.log('semester.projectName', semester.projectName)
        })
        return x;
    }
})
