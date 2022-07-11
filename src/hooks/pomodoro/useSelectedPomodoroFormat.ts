import { useState, useEffect, useMemo } from 'react';
import { PomodoroFormat } from '@prisma/client';
import { DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_LONG_BREAK_TIME } from '../../constants';

interface Props {
    formats: PomodoroFormat[];
    selectedId: string;
}

export default function useSelectedPomodoroFormat({ formats, selectedId }: Props) {
    const defaultNewPomodoroFormat = useMemo(() => {
        return {
            id: 'NEW_POMODORO_FORMAT_ID',
            userId: '-1',
            name: 'New Pomodoro Format',
            workDuration: `${DEFAULT_WORK_TIME}`,
            breakDuration: `${DEFAULT_BREAK_TIME}`,
            longBreakDuration: `${DEFAULT_LONG_BREAK_TIME}`,
            autoStartTimer: false,
        };
    }, []);
    const [selectedPomodoroFormat, setSelectedPomodoroFormat] = useState(defaultNewPomodoroFormat);

    useEffect(() => {
        setSelectedPomodoroFormat(() => {
            if (formats) {
                const foundFormat = formats?.find((option) => {
                    if (option.id === selectedId) {
                        return option;
                    }
                });
                return foundFormat ?? defaultNewPomodoroFormat;
            } else {
                return defaultNewPomodoroFormat;
            }
        });
    }, [defaultNewPomodoroFormat, formats, selectedId]);

    return { selectedPomodoroFormat, setSelectedPomodoroFormat };
}
