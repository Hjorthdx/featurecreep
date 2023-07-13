import { DuneGame } from 'prisma/prisma-client';
import { BASE_LEADERS, RISE_OF_IX_LEADERS } from '../../constants';
import useGetUsersSelectedExpansions from '../../hooks/dune/useGetUsersSelectedExpansions';
import FormSelectField from './formSelectField';

interface Props {
    game: DuneGame;
    setGame: (newGame: DuneGame) => void;
    name: string;
    label: string;
}

export default function DuneDropdownRow({ game, setGame, name, label }: Props) {
    const { selectedExpansions } = useGetUsersSelectedExpansions();

    let leaders = [...BASE_LEADERS];
    if (selectedExpansions.riseOfIX) {
        leaders = [...leaders, ...RISE_OF_IX_LEADERS];
    }

    function onOptionChange(label: string, value: string): void {
        setGame({ ...game, [label]: value });
    }

    return (
        <div className='flex'>
            <FormSelectField name={`first${name}`} label={`First ${label}`} onChange={onOptionChange}>
                {leaders.map((leader, index) => {
                    return (
                        <option key={index} value={leader.name}>
                            {leader.name}
                        </option>
                    );
                })}
                <option key='default' value='' selected />
            </FormSelectField>

            <FormSelectField name={`second${name}`} label={`Second ${label}`} onChange={onOptionChange}>
                {leaders.map((leader, index) => {
                    return (
                        <option key={index} value={leader.name}>
                            {leader.name}
                        </option>
                    );
                })}
                <option key='default' value='' selected />
            </FormSelectField>

            <FormSelectField name={`third${name}`} label={`Third ${label}`} onChange={onOptionChange}>
                {leaders.map((leader, index) => {
                    return (
                        <option key={index} value={leader.name}>
                            {leader.name}
                        </option>
                    );
                })}
                <option key='default' value='' selected />
            </FormSelectField>

            <FormSelectField name={`fourth${name}`} label={`Fourth ${label}`} onChange={onOptionChange}>
                {leaders.map((leader, index) => {
                    return (
                        <option key={index} value={leader.name}>
                            {leader.name}
                        </option>
                    );
                })}
                <option key='default' value='' selected />
            </FormSelectField>
        </div>
    );
}
