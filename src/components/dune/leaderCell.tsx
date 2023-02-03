import Link from 'next/link';
import useGetGames from '../../hooks/dune/useGetGames';
import { useSession } from 'next-auth/react';
import useLeaderStats from '../../hooks/dune/useLeaderStats';
import { Expansions } from '../../types/dune';

interface Props {
    name: string;
    image: string;
    expansions: Expansions;
}

export default function LeaderCell({ name, image, expansions }: Props) {
    const { data: session } = useSession();

    const { games } = useGetGames({
        userId: session?.user?.id ?? '',
        leader: name,
        riseOfIX: expansions.riseOfIX,
        immortality: expansions.immortality,
    });

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
            <Link
                href={{
                    pathname: `/dune/${name}`,
                    query: { name: name, image: image, riseOfIX: expansions.riseOfIX, immortality: expansions.immortality },
                }}
            >
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
                        <p className='text-white font-bold text-xl'>WR: {winrate} %</p>
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
