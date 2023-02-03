import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Popup from './popup';
import PopupFooter from './popupFooter';
import PopupHeader from './popupHeader';
import useCreateDuneGame from '../../hooks/dune/useCreateDuneGame';
import { DuneGame } from 'prisma/prisma-client';
import DuneCreateGameForm from '../forms/duneGameForm';
import useGetUsersSelectedExpansions from '../../hooks/dune/useGetUsersSelectedExpansions';

interface Props {
    show: boolean;
    handleClose: () => void;
}

export default function DuneCreateGamePopup({ show, handleClose }: Props) {
    const { data: session } = useSession();
    const { create } = useCreateDuneGame();
    const { selectedExpansions } = useGetUsersSelectedExpansions();
    const initialGame: DuneGame = {
        id: '',
        userId: session?.user.id ?? '',
        userLeader: '',
        riseOfIX: selectedExpansions.riseOfIX,
        immortality: selectedExpansions.immortality,
        name: '',
        note: '',

        firstPosition: '',
        secondPosition: '',
        thirdPosition: '',
        fourthPosition: '',

        firstPlacement: '',
        secondPlacement: '',
        thirdPlacement: '',
        fourthPlacement: '',
    };
    const [game, setGame] = useState<DuneGame>(initialGame);

    function handleSave() {
        create({
            userLeader: game.userLeader,
            riseOfIX: game.riseOfIX,
            immortality: game.immortality,
            name: game.name ?? '',
            note: game.note ?? '',
            firstPosition: game.firstPosition,
            secondPosition: game.secondPosition,
            thirdPosition: game.thirdPosition,
            fourthPosition: game.fourthPosition,

            firstPlacement: game.firstPlacement,
            secondPlacement: game.secondPlacement,
            thirdPlacement: game.thirdPlacement,
            fourthPlacement: game.fourthPlacement,
        });
        handleClose();
    }

    return (
        <Popup show={show}>
            <PopupHeader title='Submit Dune game' handleClose={handleClose} />
            <div className='relative px-5 py-4 flex-auto'>
                <DuneCreateGameForm game={game} setGame={setGame} onSubmit={handleSave} />
            </div>
            <PopupFooter handleClose={handleClose} handleSave={handleSave} />
        </Popup>
    );
}
