import { trpc } from '../../utils/trpc';

interface Props {
    userId: string;
}

export default function useGetGamesForUser({ userId }: Props) {
    const { data } = trpc.useQuery([
        'dune.getGamesForUser',
        {
            userId: userId,
        },
    ]);
    return { games: data ?? [] };
}
