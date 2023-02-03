import { useSession } from 'next-auth/react';
import useGetGamesWithLeaderForUser from '../../hooks/dune/useGetGamesWithLeaderForUser';
import Game from './game';
import AddButton from '../interactables/buttons/addButton';

interface Props {
    leader: string;
}

export default function MatchHistory({ leader }: Props) {
    const { data: session } = useSession();
    const { games } = useGetGamesWithLeaderForUser({
        userId: session?.user?.id ?? '',
        leader: leader,
    });

    return (
        <div className='flex flex-col bg-white rounded-2xl border-2 border-neutral-800 p-4'>
            <div className='flex pb-4'>
                <h2 className='text-center text-3xl w-full'>Match history</h2>
                <AddButton onClick={() => console.log('hi')} />
            </div>
            {games?.map((game) => (
                <Game key={game.id} game={game} />
            ))}
        </div>
    );
}
