import { useEffect, useReducer, useState } from 'react';
import ElevatedButton from '../buttons/elevatedButton';
import SettingsButton from '../buttons/settingsButton';
import { PomodoroModes } from '../../types/pomodoroModes';

// Could this be done in a nicer way? Currently just setting all booleans everytime a button is clicked...

interface PomodoroMethodAction {
    type: 'updateLastClicked';
    payload: PomodoroModes;
}

interface TopbarState {
    work: boolean;
    break: boolean;
    longBreak: boolean;
}

function pomodoroMethodReducer(state: TopbarState, action: PomodoroMethodAction): TopbarState {
    switch (action.type) {
        case 'updateLastClicked':
            const temp = { work: false, break: false, longBreak: false };
            return { ...temp, [action.payload]: true };
        default:
            return state;
    }
}

interface Props {
    selectedMode: PomodoroModes;
    onClick: (mode: PomodoroModes) => void;
    setShow: () => void;
}

function Topbar({ selectedMode, onClick, setShow }: Props) {
    const [state, dispatch] = useReducer(pomodoroMethodReducer, {
        work: false,
        break: false,
        longBreak: false,
        [selectedMode]: true,
    });

    useEffect(() => {
        dispatch({ type: 'updateLastClicked', payload: selectedMode });
    }, [selectedMode]);

    function onPress(mode: PomodoroModes) {
        dispatch({ type: 'updateLastClicked', payload: mode });
        onClick(mode);
    }

    return (
        <div className='p-5 py-5 inline-flex'>
            <SettingsButton onClick={setShow} />
            <ElevatedButton
                enabled={state.work}
                onClick={() => {
                    console.log('Work button!');
                    onPress('work');
                }}
            >
                Work button
            </ElevatedButton>
            <ElevatedButton
                enabled={state.break}
                onClick={() => {
                    console.log('Break button!');
                    onPress('break');
                }}
            >
                Break button
            </ElevatedButton>
            <ElevatedButton
                enabled={state.longBreak}
                onClick={() => {
                    console.log('Long break button!');
                    onPress('longBreak');
                }}
            >
                Long break button
            </ElevatedButton>
        </div>
    );
}

export default Topbar;
