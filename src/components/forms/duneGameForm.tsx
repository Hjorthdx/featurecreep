import { Formik, Form } from 'formik';
import FormTextField from './formTextField';
import { DuneGame } from 'prisma/prisma-client';
import { BASE_LEADERS, RISE_OF_IX_LEADERS } from '../../constants';
import DuneDropdownRow from './duneDropdownRow';
import FormToggleField from './formToggleField';

// What to do about creating expansion specific game?
const leaders = [...BASE_LEADERS, ...RISE_OF_IX_LEADERS];

interface Props {
    game: DuneGame;
    setGame: (newGame: DuneGame) => void;
    onSubmit: () => void;
}

// TODO: Validation schema
// TODO: Should reset the form after submitting

// The same leader cannot be chosen in two spaces at the same time. Unless ofcourse it's position and placement.
// Something with expansions
export default function DuneCreateGameForm({ game, setGame, onSubmit }: Props) {
    function onChange(name: string, value: string): void {
        setGame({ ...game, [name]: value });
    }

    function onToggleClick(name: keyof DuneGame): void {
        setGame({ ...game, [name]: !game[name] });
    }

    return (
        <Formik enableReinitialize={true} initialValues={game} onSubmit={onSubmit}>
            <Form>
                <div className='flex'>
                    <FormTextField name='name' label='Name' onChange={onChange} />
                    <FormTextField name='note' label='Note' onChange={onChange} />
                    <FormToggleField
                        name='riseOfIX'
                        label='Rise of IX'
                        enabled={game.riseOfIX}
                        onChange={() => onToggleClick('riseOfIX')}
                    />
                    <FormToggleField
                        name='immortality'
                        label='Immortality'
                        enabled={game.immortality}
                        onChange={() => onToggleClick('immortality')}
                    />
                </div>

                {/* Positions */}
                <DuneDropdownRow game={game} setGame={setGame} name='Placement' label='placement' />

                {/* Placements */}
                {/* Could I do something smart here with only showing the leaders that have been shown for the positions above? */}
                <DuneDropdownRow game={game} setGame={setGame} name='Position' label='position' />
            </Form>
        </Formik>
    );
}
