import { z } from 'zod';
import { createProtectedRouter } from '../protectedRouter';

export const duneRouter = createProtectedRouter()
    .query('getGamesForUser', {
        input: z.object({
            userId: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.duneGame.findMany({
                where: {
                    userId: input.userId,
                },
            });
        },
    })
    .query('getGamesWithLeaderForUser', {
        input: z.object({
            userId: z.string(),
            leader: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.duneGame.findMany({
                where: {
                    userId: input.userId,
                    userLeader: input.leader,
                },
            });
        },
    })
    .mutation('createDuneGameForLeader', {
        input: z.object({
            userLeader: z.string(),
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
    });
