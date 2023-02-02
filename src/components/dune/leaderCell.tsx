import Link from 'next/link';
import useGetGamesWithLeaderForUser from '../../hooks/dune/useGetGamesWithLeaderForUser';
import { useSession } from 'next-auth/react';
import useLeaderOverviewStats from '../../hooks/dune/useLeaderOverviewStats';

interface Props {
    name: string;
    image: string;
}

export default function LeaderCell({ name, image }: Props) {
    const { data: session } = useSession();

    const { games } = useGetGamesWithLeaderForUser({ userId: session?.user?.id ?? '', leader: name });

    const {
        gamesWon,
        averagePlacmentFirstPosition,
        averagePlacmentSecondPosition,
        averagePlacmentThirdPosition,
        averagePlacmentFourthPosition,
    } = useLeaderOverviewStats({ games, name });

    return (
        <section className='h-96 max-h-64 min-h-full transform group duration-300 hover:scale-105 hover:border-blue-600 hover:-translate-y-1 hover:shadow-2xl hover:cursor-pointer'>
            <Link href={`/dune/${name}`}>
                <div
                    className={`p-5 py-10 h-full text-center bg-no-repeat bg-cover bg-center`}
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <p className='text-white font-bold text-xl'>Total games: {games.length}</p>
                    <p className='text-white font-bold text-xl'>
                        Games won:
                        {gamesWon}
                    </p>
                    <p className='text-white font-bold text-xl'>WR: {gamesWon / games.length}</p>
                    <p className='text-white font-bold text-xl'>
                        1st: {averagePlacmentFirstPosition}, 2nd: {averagePlacmentSecondPosition}, 3rd :
                        {averagePlacmentThirdPosition}, 4th: {averagePlacmentFourthPosition}
                    </p>
                </div>
            </Link>
        </section>
    );
}
