import { useEffect, useReducer } from 'react';
import ElevatedButton from '../interactables/buttons/elevatedButton';
import SettingsButton from '../interactables/buttons/settingsButton';
import { PomodoroModes } from '../../types/pomodoroModes';

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
            return { ...temp, [action.payload]: true };
        default:
            return state;
    }
}

interface Props {
    selectedMode: TopbarModes;
    onClick: (mode: PomodoroModes) => void;
    show: boolean;
    setShow: () => void;
}

export default function Topbar({ selectedMode, onClick, show, setShow }: Props) {
    const [state, dispatch] = useReducer(pomodoroMethodReducer, {
        work: false,
        break: false,
        longBreak: false,
        settings: false,
        [selectedMode]: true,
    });

    useEffect(() => {
        dispatch({ type: 'updateLastClicked', payload: selectedMode });
    }, [selectedMode]);

    function onPress(mode: PomodoroModes) {
        dispatch({ type: 'updateLastClicked', payload: mode });
        onClick(mode);
    }

    function onSettingsPress(mode: TopbarModes) {
        dispatch({ type: 'updateLastClicked', payload: mode });
        setShow();
    }

    useEffect(() => {
        if (!show) {
            dispatch({ type: 'updateLastClicked', payload: selectedMode });
        }
    }, [selectedMode, show]);

    return (
        <div className='p-5 py-5 inline-flex'>
            <SettingsButton enabled={state.settings} onClick={() => onSettingsPress('settings')} />
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
