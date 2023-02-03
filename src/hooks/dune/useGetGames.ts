import { trpc } from '../../utils/trpc';

interface Props {
    userId?: string;
    leader?: string;
    riseOfIX?: boolean;
    immortality?: boolean;
}

export default function useGetGames({ userId, leader, riseOfIX, immortality }: Props) {
    const { data } = trpc.useQuery([
        'dune.getGames',
        {
            userId: userId,
            leader: leader,
            riseOfIX: riseOfIX,
            immortality: immortality,
        },
    ]);
    return { games: data ?? [] };
}
