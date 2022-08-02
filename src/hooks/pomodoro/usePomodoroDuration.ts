import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useGetSelectedPomodoroFormat from './format/useGetSelectedPomodoroFormat';
import { DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_LONG_BREAK_TIME, SECONDS_IN_A_MINUTE } from '../../constants';
import { PomodoroModes } from '../../types/pomodoroModes';

interface Props {
    selectedMode: PomodoroModes;
}

export default function usePomodoroDuration({ selectedMode }: Props) {
    const { data: session } = useSession();
    const { selectedPomodoroFormat } = useGetSelectedPomodoroFormat({
        pomodoroFormatId: session?.user.selectedPomodoroFormatId ?? '',
    });
    const [duration, setDuration] = useState(() =>
        selectedPomodoroFormat
            ? Number(selectedPomodoroFormat?.workDuration) * SECONDS_IN_A_MINUTE
            : DEFAULT_WORK_TIME * SECONDS_IN_A_MINUTE
    );
    useEffect(() => {
        setDuration(
            selectedMode === 'work'
                ? Number(selectedPomodoroFormat.workDuration) * SECONDS_IN_A_MINUTE
                : selectedMode === 'break'
                ? Number(selectedPomodoroFormat.breakDuration) * SECONDS_IN_A_MINUTE
                : Number(selectedPomodoroFormat.longBreakDuration) * SECONDS_IN_A_MINUTE
        );
    }, [selectedPomodoroFormat, selectedMode]);

    return { duration };
}
