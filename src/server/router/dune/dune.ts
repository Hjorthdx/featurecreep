import { z } from 'zod';
import { createProtectedRouter } from '../protectedRouter';

export const duneRouter = createProtectedRouter()
    .query('getGames', {
        input: z.object({
            userId: z.string().optional(),
            leader: z.string().optional(),
            riseOfIX: z.boolean().optional(),
            immortality: z.boolean().optional(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.duneGame.findMany({
                where: {
                    userId: input.userId ?? undefined,
                    userLeader: input.leader ?? undefined,
                    riseOfIX: input.riseOfIX ?? undefined,
                    immortality: input.immortality ?? undefined,
                },
            });
        },
    })
    .mutation('createDuneGameForLeader', {
        input: z.object({
            userLeader: z.string(),
            riseOfIX: z.boolean(),
            immortality: z.boolean(),
            name: z.string().optional(),
            note: z.string().optional(),
            firstPosition: z.string(),
            secondPosition: z.string(),
            thirdPosition: z.string(),
            fourthPosition: z.string(),
            firstPlacement: z.string(),
            secondPlacement: z.string(),
            thirdPlacement: z.string(),
            fourthPlacement: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.duneGame.create({
                data: {
                    userId: ctx.session.user.id,
                    userLeader: input.userLeader,
                    riseOfIX: input.riseOfIX,
                    immortality: input.immortality,
                    name: input.name,
                    note: input.note,
                    firstPosition: input.firstPosition,
                    secondPosition: input.secondPosition,
                    thirdPosition: input.thirdPosition,
                    fourthPosition: input.fourthPosition,
                    firstPlacement: input.firstPlacement,
                    secondPlacement: input.secondPlacement,
                    thirdPlacement: input.thirdPlacement,
                    fourthPlacement: input.fourthPlacement,
                },
            });
        },
    })
    .query('getUsersSelectedExpansions', {
        async resolve({ ctx }) {
            const user = await ctx.prisma.user.findFirst({
                where: { id: ctx.session.user.id },
            });
            return { riseOfIX: user?.riseOfIX ?? false, immortality: user?.immortality ?? false };
        },
    })
    .mutation('updateUsersSelectedExpansions', {
        input: z.object({
            riseOfIX: z.boolean().optional(),
            immortality: z.boolean().optional(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.user.updateMany({
                where: { id: ctx.session.user.id },
                data: {
                    riseOfIX: input.riseOfIX ?? ctx.session.user.riseOfIX,
                    immortality: input.immortality ?? ctx.session.user.riseOfIX,
                },
            });
        },
    });
