import { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CountdownClock from './countdownClock';
import { PomodoroModes } from '../../types/pomodoroModes';
import BottomBar from './bottomBar';
import Topbar from './topBar';
import useCreateTimer from '../../hooks/pomodoro/useCreateTimer';
import useGetSelectedPomodoroFormat from '../../hooks/pomodoro/useGetSelectedPomodoroFormat';
import { DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_LONG_BREAK_TIME, SECONDS_IN_A_MINUTE } from '../../constants';

interface Props {
    setShow: () => void;
}

// TODO: Make reducer for this component
export default function PomodoroTimer({ setShow }: Props) {
    const { data: session } = useSession();
    const { create } = useCreateTimer();
    const { selectedPomodoroFormat } = useGetSelectedPomodoroFormat({
        pomodoroFormatId: session?.user.selectedPomodoroFormatId,
    });
    const [selectedMode, setSelectedMode] = useState<PomodoroModes>('work');
    const [isPlaying, setIsPlaying] = useState(false);
    const [startedAt, setStartedAt] = useState<Date>();
    const [duration, setDuration] = useState(() =>
        selectedPomodoroFormat
            ? Number(selectedPomodoroFormat?.workDuration) * SECONDS_IN_A_MINUTE
            : DEFAULT_WORK_TIME * SECONDS_IN_A_MINUTE
    );
    useEffect(() => {
        setDuration(
            selectedPomodoroFormat
                ? Number(selectedPomodoroFormat?.workDuration) * SECONDS_IN_A_MINUTE
                : DEFAULT_WORK_TIME * SECONDS_IN_A_MINUTE
        );
    }, [selectedPomodoroFormat]);
    const [pomodoroCount, setPomodoroCount] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

    function handleChangeSelectedMode(mode: PomodoroModes) {
        if (mode === selectedMode) {
            return;
        }
        setSelectedMode(mode);
        if (selectedPomodoroFormat) {
            setDuration(
                mode === 'work'
                    ? Number(selectedPomodoroFormat.workDuration) * SECONDS_IN_A_MINUTE
                    : mode === 'break'
                    ? Number(selectedPomodoroFormat.breakDuration) * SECONDS_IN_A_MINUTE
                    : Number(selectedPomodoroFormat.longBreakDuration) * SECONDS_IN_A_MINUTE
            );
            setIsPlaying(false);
        } else {
            setDuration(
                mode === 'work'
                    ? DEFAULT_WORK_TIME * SECONDS_IN_A_MINUTE
                    : mode === 'break'
                    ? DEFAULT_BREAK_TIME * SECONDS_IN_A_MINUTE
                    : DEFAULT_LONG_BREAK_TIME * SECONDS_IN_A_MINUTE
            );
            setIsPlaying(false);
        }
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
            create({
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
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <Topbar selectedMode={selectedMode} onClick={handleChangeSelectedMode} setShow={setShow} />
            <audio ref={audioRef}>
                <source src='/alarm.mp3' type='audio/mp3' />
            </audio>
            <CountdownClock isPlaying={isPlaying} duration={duration} onComplete={onComplete} selectedMode={selectedMode} />
            <BottomBar isPlaying={isPlaying} onClick={onClick} />
        </div>
    );
}
