import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import CountdownClock from './countdownClock';
import { PomodoroModes } from '../../types/pomodoroModes';
import BottomBar from './bottomBar';
import Topbar from './topBar';
import useCreateTimer from '../../hooks/pomodoro/timer/useCreateTimer';
import useGetSelectedPomodoroFormat from '../../hooks/pomodoro/format/useGetSelectedPomodoroFormat';
import usePomodoroDuration from '../../hooks/pomodoro/usePomodoroDuration';

// TODO: Make reducer for this component
// Do something about this. This component is way too complex
export default function PomodoroTimer() {
    const { data: session } = useSession();
    const { create: createTimer } = useCreateTimer();
    const { selectedPomodoroFormat } = useGetSelectedPomodoroFormat({
        pomodoroFormatId: session?.user?.selectedPomodoroFormatId ?? '',
    });
    const [selectedMode, setSelectedMode] = useState<PomodoroModes>('work');
    const [isPlaying, setIsPlaying] = useState(false);
    const [startedAt, setStartedAt] = useState<Date>();
    const { duration } = usePomodoroDuration({ selectedPomodoroFormat: selectedPomodoroFormat, selectedMode: selectedMode });

    const [pomodoroCount, setPomodoroCount] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

    function handleChangeSelectedMode(mode: PomodoroModes) {
        if (mode === selectedMode) {
            return;
        }
        setSelectedMode(mode);
        setIsPlaying(false);
        setStartedAt(undefined);
        setPomodoroCount(1);
    }

    function onComplete() {
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
        setIsPlaying(selectedPomodoroFormat?.autoStartTimer ?? false);
        // I don't think it's possible for startedAt to be undefined at this point,
        // but not sure how to tell TS right now that that is the case.
        if (startedAt) {
            createTimer({
                mode: selectedMode,
                createdAt: startedAt,
                duration: duration,
            });
        }
    }

    function onClick(isPlaying: boolean) {
        if (isPlaying) {
            audioRef.current?.pause();
        }
        setIsPlaying(isPlaying);
        if (isPlaying && !startedAt) {
            setStartedAt(new Date());
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <Topbar selectedMode={selectedMode} onClick={handleChangeSelectedMode} />
            <audio ref={audioRef}>
                <source src='/alarm.mp3' type='audio/mp3' />
            </audio>
            <CountdownClock isPlaying={isPlaying} duration={duration} onComplete={onComplete} />
            <BottomBar isPlaying={isPlaying} onClick={onClick} />
        </div>
    );
}
