import { useSession } from 'next-auth/react';
import useGetGames from '../../hooks/dune/useGetGames';
import useLeaderStats from '../../hooks/dune/useLeaderStats';
import { Expansions } from '../../types/dune';

interface Props {
    leader: string;
    image: string;
    expansions: Expansions;
}

export default function LeaderStats({ leader, image, expansions }: Props) {
    const { data: session } = useSession();
    const { games } = useGetGames({
        userId: session?.user?.id ?? '',
        leader: leader,
        riseOfIX: expansions.IX,
        immortality: expansions.Immortality,
    });

    const {
        gamesWon,
        winrate,
        averagePlacement,
        firstPositionGames,
        averagePlacementFirstPosition,
        secondPositionGames,
        averagePlacementSecondPosition,
        thirdPositionGames,
        averagePlacementThirdPosition,
        fourthPositionGames,
        averagePlacementFourthPosition,
    } = useLeaderStats({ games, name: leader });

    return (
        <div className='flex'>
            <div
                className={`w-1/2 p-5 py-10 h-80 bg-no-repeat bg-center bg-contain`}
                style={{ backgroundImage: `url(${image})`, height: '400px', width: '600px' }}
            />
            <div className='w-1/2 p-5 py-10 flex flex-col justify-center'>
                <h3 className='text-xl font-bold'>{leader}</h3>
                <div className='mt-4'>
                    <p className='text-sm font-medium'>Games won: {gamesWon}</p>
                    <p className='text-sm font-medium'>Win rate: {winrate}%</p>
                    <p className='text-sm font-medium'>Average placement: {averagePlacement}</p>
                    <p className='text-sm font-medium'>Number of first position games: {firstPositionGames}</p>
                    <p className='text-sm font-medium'>Average placement first position: {averagePlacementFirstPosition}</p>
                    <p className='text-sm font-medium'>Number of second position games: {secondPositionGames}</p>
                    <p className='text-sm font-medium'>
                        Average placement second position: {averagePlacementSecondPosition}
                    </p>
                    <p className='text-sm font-medium'>Number of third position games: {thirdPositionGames}</p>
                    <p className='text-sm font-medium'>Average placement third position: {averagePlacementThirdPosition}</p>
                    <p className='text-sm font-medium'>Number of fourth position games: {fourthPositionGames}</p>
                    <p className='text-sm font-medium'>
                        Average placement fourth position: {averagePlacementFourthPosition}
                    </p>
                </div>
            </div>
        </div>
    );
}
