import { z } from 'zod';
import { createRouter } from '../context';

export const duneRouter = createRouter()
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
    });
