import { DuneGame } from 'prisma/prisma-client';
import ResultRow from './resultsRow';

interface Props {
    game: DuneGame;
}

export default function Game({ game }: Props) {
    return (
        <div className='flex flex-col w-full mb-4 bg-white rounded-2xl border-2 border-neutral-800'>
            <div className='px-6 py-4'>
                <div>
                    {game.name && <div className='font-medium text-3xl mb-2'>{game.name}</div>}
                    {game.note && <div className='text-lg mb-2'>{game.note}</div>}
                </div>
                <ResultRow
                    heading1='First Position:'
                    heading2='Second Position:'
                    heading3='Third Position:'
                    heading4='Fourth Position:'
                    value1={game.firstPosition}
                    value2={game.secondPosition}
                    value3={game.thirdPosition}
                    value4={game.fourthPosition}
                />
            </div>
            <div className='px-6 pb-4'>
                <ResultRow
                    heading1='First Placement:'
                    heading2='Second Placement:'
                    heading3='Third Placement:'
                    heading4='Fourth Placement:'
                    value1={game.firstPlacement}
                    value2={game.secondPlacement}
                    value3={game.thirdPlacement}
                    value4={game.fourthPlacement}
                />
            </div>
        </div>
    );
}
