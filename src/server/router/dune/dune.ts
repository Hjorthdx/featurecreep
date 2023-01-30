import { z } from 'zod';
import { createRouter } from '../context';

export const duneRouter = createRouter().query('getGamesWithLeaderForUser', {
    input: z.object({
        userId: z.string(),
        leader: z.string(),
    }),
    async resolve({ input, ctx }) {
        return await ctx.prisma.duneGame.findMany({
            where: {
                userId: input.userId,
                playedLeader: input.leader,
            },
        });
    },
});
