import { useReducer } from 'react';
import { PomodoroModes } from '../../types/pomodoroModes';
import PomodoroSettingsDialog from '../dialogs/pomodoroSettingsDialog';
import ElevatedButton from '../interactables/buttons/elevatedButton';
import { GearIcon } from '@radix-ui/react-icons';

type TopbarModes = PomodoroModes | 'settings';

// Could this be done in a nicer way? Currently just setting all booleans everytime a button is clicked...

interface PomodoroMethodAction {
    type: 'updateLastClicked';
    payload: TopbarModes;
}

interface TopbarState {
    work: boolean;
    break: boolean;
    longBreak: boolean;
    settings: boolean;
}

function pomodoroMethodReducer(state: TopbarState, action: PomodoroMethodAction): TopbarState {
    switch (action.type) {
        case 'updateLastClicked':
            const temp = { work: false, break: false, longBreak: false, settings: false };
            return { ...temp, [action.payload]: !state[action.payload] };
        default:
            return state;
    }
}

interface Props {
    selectedMode: TopbarModes;
    onClick: (mode: PomodoroModes) => void;
}

export default function Topbar({ selectedMode, onClick }: Props) {
    const [state, dispatch] = useReducer(pomodoroMethodReducer, {
        work: false,
        break: false,
        longBreak: false,
        settings: false,
        [selectedMode]: true,
    });

    function onPress(mode: PomodoroModes) {
        dispatch({ type: 'updateLastClicked', payload: mode });
        onClick(mode);
    }

    function onSettingsPress(mode: TopbarModes) {
        dispatch({ type: 'updateLastClicked', payload: mode });
    }

    return (
        <div className='flex space-x-2 pb-5'>
            <PomodoroSettingsDialog enabled={state.settings} closeDialog={() => onSettingsPress('settings')} />
            <ElevatedButton enabled={state.settings} onClick={() => onSettingsPress('settings')}>
                <GearIcon />
            </ElevatedButton>
            <ElevatedButton enabled={state.work} onClick={() => onPress('work')}>
                Work button
            </ElevatedButton>
            <ElevatedButton enabled={state.break} onClick={() => onPress('break')}>
                Break button
            </ElevatedButton>
            <ElevatedButton enabled={state.longBreak} onClick={() => onPress('longBreak')}>
                Long break button
            </ElevatedButton>
        </div>
    );
}
