import { useState } from 'react';
import CountdownClock from './countdownClock';
import { PomodoroModes } from './pomodoroModes';
import BottomBar from './bottomBar';
import Topbar from './topBar';

// onComplete should save the pomodoro in the database
// Save individual timers or only together?

function PomodoroTimer() {
    const [selectedMode, setSelectedMode] = useState<PomodoroModes>('work');
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(25 * 60);

    function handleChangeSelectedMode(mode: PomodoroModes) {
        setSelectedMode(mode);
        setDuration(mode === 'work' ? 25 * 60 : mode === 'break' ? 5 * 60 : 15 * 60);
        setIsPlaying(false);
    }

    return (
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <Topbar setSelectedMode={handleChangeSelectedMode} />
            <CountdownClock
                isPlaying={isPlaying}
                duration={duration}
                onComplete={() => console.log('onComplete')}
                selectedMode={selectedMode}
            />
            <BottomBar setIsPlaying={setIsPlaying} />
        </div>
    );
}

export default PomodoroTimer;
