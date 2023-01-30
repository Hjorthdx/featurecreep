import { trpc } from '../../utils/trpc';

interface Props {
    userId: string;
    leader: string;
}

export default function useGetGamesWithLeaderForUser({ userId, leader }: Props) {
    const { data } = trpc.useQuery([
        'dune.getGamesWithLeaderForUser',
        {
            userId: userId,
            leader: leader,
        },
    ]);
    return { games: data ?? [] };
}
