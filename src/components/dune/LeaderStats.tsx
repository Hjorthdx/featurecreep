import { useSession } from 'next-auth/react';
import useGetGames from '../../hooks/dune/useGetGames';
import useLeaderStats from '../../hooks/dune/useLeaderStats';
import useGetUsersSelectedExpansions from '../../hooks/dune/useGetUsersSelectedExpansions';

interface Props {
    leader: string;
    image: string;
}

export default function LeaderStats({ leader, image }: Props) {
    const { selectedExpansions } = useGetUsersSelectedExpansions();
    const { data: session } = useSession();
    const { games } = useGetGames({
        userId: session?.user?.id ?? '',
        leader: leader,
        riseOfIX: selectedExpansions?.riseOfIX,
        immortality: selectedExpansions?.immortality,
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
                className='w-1/2 p-5 py-10 h-80 bg-no-repeat bg-center bg-contain'
                style={{ backgroundImage: `url(${image})`, height: '400px', width: '600px' }}
            />
            <div className='w-2/3 p-5 py-10 flex flex-col justify-center h-full'>
                <p className='text-6xl font-bold underline mb-4'>{leader}</p>
                <p className='text-2xl italic'>
                    {selectedExpansions?.riseOfIX && selectedExpansions?.immortality
                        ? 'Rise of IX + Immortality'
                        : selectedExpansions?.riseOfIX
                        ? 'Rise of IX'
                        : selectedExpansions?.immortality
                        ? 'Immortality'
                        : 'Base'}
                </p>
                <div className='mb-4'>
                    <div className='mb-4'>
                        <p className='text-2xl font-medium mt-4'>Games won: {gamesWon}</p>
                        <p className='text-2xl font-medium'>Win rate: {winrate}%</p>
                        <p className='text-2xl font-medium'>Average placement: {averagePlacement}</p>
                    </div>
                    <div className='flex'>
                        <div className='w-1/4'>
                            <p className='text-2xl font-medium underline'>First Position</p>
                            <p className='text-xl font-small'>Games: {firstPositionGames}</p>
                            <p className='text-xl font-small'>Average Placement: {averagePlacementFirstPosition}</p>
                        </div>
                        <div className='w-1/4'>
                            <p className='text-2xl font-medium underline'>Second Position</p>
                            <p className='text-xl font-small'>Games: {secondPositionGames}</p>
                            <p className='text-xl font-small'>Average Placement: {averagePlacementSecondPosition}</p>
                        </div>
                        <div className='w-1/4'>
                            <p className='text-2xl font-medium underline'>Third Position</p>
                            <p className='text-xl font-small'>Games: {thirdPositionGames}</p>
                            <p className='text-xl font-small'>Average Placement: {averagePlacementThirdPosition}</p>
                        </div>
                        <div className='w-1/4'>
                            <p className='text-2xl font-medium underline'>Fourth Position</p>
                            <p className='text-xl font-small'>Games: {fourthPositionGames}</p>
                            <p className='text-xl font-small'>Average Placement: {averagePlacementFourthPosition}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
