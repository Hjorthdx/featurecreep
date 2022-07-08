import { useRef, useState } from 'react';
import CountdownClock from './countdownClock';
import { PomodoroModes } from './pomodoroModes';
import BottomBar from './bottomBar';
import Topbar from './topBar';
import { trpc } from '../../utils/trpc';

interface Props {
    setShow: () => void;
}

// TODO: Make reducer for this component
function PomodoroTimer({ setShow }: Props) {
    const { mutate } = trpc.useMutation('pomodoro.createTimer');
    const [selectedMode, setSelectedMode] = useState<PomodoroModes>('work');
    const [isPlaying, setIsPlaying] = useState(false);
    const [startedAt, setStartedAt] = useState<Date>();
    const [duration, setDuration] = useState(25 * 60);
    const [pomodoroCount, setPomodoroCount] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

    function handleChangeSelectedMode(mode: PomodoroModes) {
        setSelectedMode(mode);
        setDuration(mode === 'work' ? 25 * 60 : mode === 'break' ? 5 * 60 : 15 * 60);
        setIsPlaying(false);
        setStartedAt(undefined);
        setPomodoroCount(0);
    }

    function onComplete() {
        console.log('onComplete', pomodoroCount, selectedMode);
        if (pomodoroCount === 4 && selectedMode === 'work') {
            setSelectedMode('longBreak');
            setPomodoroCount(1);
        } else if (selectedMode === 'work') {
            setSelectedMode('break');
            setPomodoroCount(pomodoroCount + 1);
        } else {
            setSelectedMode('work');
        }
        audioRef.current?.play();
        setIsPlaying(false);
        // I don't think it's possible for startedAt to be undefined at this point,
        // but not sure how to tell TS right now that that is the case.
        if (startedAt) {
            mutate({
                mode: selectedMode,
                createdAt: startedAt,
                duration: duration,
            });
        }
    }

    function onClick(isPlaying: boolean) {
        setIsPlaying(isPlaying);
        if (isPlaying && !startedAt) {
            setStartedAt(new Date());
        }
    }

    return (
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <Topbar onClick={handleChangeSelectedMode} setShow={setShow} />
            <audio ref={audioRef}>
                <source src='/alarm.mp3' type='audio/mp3' />
            </audio>
            <CountdownClock isPlaying={isPlaying} duration={duration} onComplete={onComplete} selectedMode={selectedMode} />
            <BottomBar isPlaying={isPlaying} onClick={onClick} />
        </div>
    );
}

export default PomodoroTimer;
// <button onClick={() => toggle()}>{isPlaying ? 'Pause' : 'Play'}</button>
