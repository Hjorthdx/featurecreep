import { useReducer } from 'react';
import ElevatedButton from '../buttons/elevatedButton';
import SettingsButton from '../buttons/settingsButton';
import { PomodoroModes } from './pomodoroModes';
import useCreatePomodoroFormat from '../../hooks/useCreatePomodoroFormat';

// Could this be done in a nicer way? Currently just setting all booleans everytime a button is clicked.

interface PomodoroMethodAction {
    type: PomodoroModes;
}

interface TopbarState {
    workBool: boolean;
    breakBool: boolean;
    longBreakBool: boolean;
}

const initialState: TopbarState = { workBool: true, breakBool: false, longBreakBool: false };

function pomodoroMethodReducer(state: TopbarState, action: PomodoroMethodAction): TopbarState {
    switch (action.type) {
        case 'work':
            return { ...state, workBool: true, breakBool: false, longBreakBool: false };
        case 'break':
            return { ...state, workBool: false, breakBool: true, longBreakBool: false };
        case 'longBreak':
            return { ...state, workBool: false, breakBool: false, longBreakBool: true };
        default:
            return state;
    }
}

interface Props {
    onClick: (mode: PomodoroModes) => void;
    setShow: () => void;
}

function Topbar({ onClick, setShow }: Props) {
    const [state, dispatch] = useReducer(pomodoroMethodReducer, initialState);
    const { create } = useCreatePomodoroFormat();

    function onPress(mode: PomodoroModes) {
        dispatch({ type: mode });
        onClick(mode);
    }

    return (
        <div className='p-5 py-5 inline-flex'>
            <SettingsButton onClick={setShow} />
            <ElevatedButton
                enabled={state.workBool}
                onClick={() => {
                    console.log('Work button!');
                    onPress('work');
                }}
            >
                Work button
            </ElevatedButton>
            <ElevatedButton
                enabled={state.breakBool}
                onClick={() => {
                    console.log('Break button!');
                    onPress('break');
                }}
            >
                Break button
            </ElevatedButton>
            <ElevatedButton
                enabled={state.longBreakBool}
                onClick={() => {
                    console.log('Long break button!');
                    onPress('longBreak');
                }}
            >
                Long break button
            </ElevatedButton>
            <ElevatedButton
                onClick={() =>
                    create({
                        name: 'initialValues.formatName',
                        workDuration: 50,
                        breakDuration: 10,
                        longBreakDuration: 30,
                    })
                }
            >
                Create
            </ElevatedButton>
        </div>
    );
}

export default Topbar;
