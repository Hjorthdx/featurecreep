import { useSession } from 'next-auth/react';
import useGetGames from '../../hooks/dune/useGetGames';
import Game from './game';
import AddButton from '../interactables/buttons/addButton';
import useGetUsersSelectedExpansions from '../../hooks/dune/useGetUsersSelectedExpansions';

interface Props {
    leader: string;
    show: boolean;
    setShow: () => void;
}

export default function MatchHistory({ leader, show, setShow }: Props) {
    const { data: session } = useSession();
    const { selectedExpansions } = useGetUsersSelectedExpansions();
    const { games } = useGetGames({
        userId: session?.user?.id ?? '',
        leader: leader,
        riseOfIX: selectedExpansions?.riseOfIX,
        immortality: selectedExpansions?.immortality,
    });

    return (
        <div className='flex flex-col bg-white rounded-2xl border-2 border-neutral-800 p-4'>
            <div className='flex pb-4'>
                <h2 className='text-center text-3xl w-full'>Match history</h2>
                <AddButton onClick={setShow} />
            </div>
            {games?.map((game) => (
                <Game key={game.id} game={game} />
            ))}
        </div>
    );
}
