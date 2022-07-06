import ElevatedButton from '../buttons/elevatedButton';
import SettingsButton from '../buttons/settingsButton';
import { PomodoroModes } from './pomodoroModes';

interface Props {
    onClick: (mode: PomodoroModes) => void;
}

function Topbar({ onClick }: Props) {
    return (
        <div className='p-5 py-5 inline-flex'>
            <SettingsButton onClick={() => console.log('Settings button!')} />
            <ElevatedButton
                onClick={() => {
                    console.log('Work button!');
                    onClick('work');
                }}
            >
                Work button
            </ElevatedButton>
            <ElevatedButton
                onClick={() => {
                    console.log('Break button!');
                    onClick('break');
                }}
            >
                Break button
            </ElevatedButton>
            <ElevatedButton
                onClick={() => {
                    console.log('Long break button!');
                    onClick('longBreak');
                }}
            >
                Long break button
            </ElevatedButton>
        </div>
    );
}

export default Topbar;