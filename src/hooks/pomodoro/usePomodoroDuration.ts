import { useEffect, useState } from 'react';
import { DEFAULT_WORK_TIME, SECONDS_IN_A_MINUTE } from '../../constants';
import { PomodoroModes } from '../../types/pomodoroModes';
import { PomodoroFormat } from 'prisma/prisma-client';

interface Props {
    selectedPomodoroFormat: PomodoroFormat;
    selectedMode: PomodoroModes;
}

export default function usePomodoroDuration({ selectedPomodoroFormat, selectedMode }: Props) {
    const [duration, setDuration] = useState(() =>
        selectedPomodoroFormat
            ? Number(selectedPomodoroFormat.workDuration) * SECONDS_IN_A_MINUTE
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
