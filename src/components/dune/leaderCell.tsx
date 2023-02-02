import Link from 'next/link';
import useGetGamesWithLeaderForUser from '../../hooks/dune/useGetGamesWithLeaderForUser';
import { useSession } from 'next-auth/react';
import useLeaderStats from '../../hooks/dune/useLeaderStats';

interface Props {
    name: string;
    image: string;
}

export default function LeaderCell({ name, image }: Props) {
    const { data: session } = useSession();

    const { games } = useGetGamesWithLeaderForUser({ userId: session?.user?.id ?? '', leader: name });

    const {
        gamesWon,
        winrate,
        averagePlacement,
        averagePlacementFirstPosition,
        averagePlacementSecondPosition,
        averagePlacementThirdPosition,
        averagePlacementFourthPosition,
    } = useLeaderStats({ games, name });

    return (
        <section
            className='h-96 max-h-64 min-h-full transform group duration-300 hover:scale-105 hover:border-blue-600 hover:-translate-y-1 hover:cursor-pointer'
            style={{ height: '31vh', maxHeight: '700px', minHeight: '200px' }}
        >
            <Link href={{ pathname: `/dune/${name}`, query: { name: name, image: image } }}>
                <div
                    className={`w-1/2 p-5 py-10 h-80 bg-no-repeat bg-center bg-contain`}
                    style={{ backgroundImage: `url(${image})`, height: '100%', width: '100%' }}
                >
                    <div className='text-center'>
                        <p className='text-white font-bold text-xl'>Total games: {games.length}</p>
                        <p className='text-white font-bold text-xl'>
                            Games won:
                            {gamesWon}
                        </p>
                        <p className='text-white font-bold text-xl'>WR: {winrate}</p>
                        <p className='text-white font-bold text-xl'>Average placement: {averagePlacement}</p>
                        <p className='text-white font-bold text-xl'>
                            1st: {averagePlacementFirstPosition}, 2nd: {averagePlacementSecondPosition}, 3rd :
                            {averagePlacementThirdPosition}, 4th: {averagePlacementFourthPosition}
                        </p>
                    </div>
                </div>
            </Link>
        </section>
    );
}
