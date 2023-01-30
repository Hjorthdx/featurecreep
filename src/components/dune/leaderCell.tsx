import Link from 'next/link';
import GridCell from '../grids/gridCell';
import useGetGamesWithLeaderForUser from '../../hooks/dune/useGetGamesWithLeaderForUser';
import { useSession } from 'next-auth/react';

interface Props {
    name: string;
}

export default function LeaderCell({ name }: Props) {
    const { data: session } = useSession();

    const { games } = useGetGamesWithLeaderForUser({ userId: session?.user?.id ?? '', leader: name });

    const gamesWon = games.reduce((acc, game) => {
        return game.playedLeader === name && game.firstPlaceLeader == name ? acc + 1 : acc;
    }, 0);

    return (
        <GridCell>
            {/* Fix this link */}
            <Link href={`/dune/${name}`}>
                <div className='p-5 py-10 flex flex-col justify-center h-full text-center'>
                    <h2 className='mb-5 text-3xl'>{name}</h2>
                    <p>Total games: {games.length}</p>
                    <p>
                        Games won:
                        {gamesWon}
                    </p>
                    <p>WR: {gamesWon / games.length}</p>
                </div>
            </Link>
        </GridCell>
    );
}
