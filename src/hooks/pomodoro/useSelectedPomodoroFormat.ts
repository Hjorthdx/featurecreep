import { useState, useEffect } from 'react';
import { PomodoroFormat } from '@prisma/client';
import { DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_LONG_BREAK_TIME } from '../../constants';

interface Props {
    formats: PomodoroFormat[];
    selectedId: string;
}

export default function useSelectedPomodoroFormat({ formats, selectedId }: Props) {
    const [selectedPomodoroFormat, setSelectedPomodoroFormat] = useState({
        id: '-1',
        userId: '-1',
        name: 'New Pomodoro Format',
        workDuration: `${DEFAULT_WORK_TIME}`,
        breakDuration: `${DEFAULT_BREAK_TIME}`,
        longBreakDuration: `${DEFAULT_LONG_BREAK_TIME}`,
        autoStartTimer: false,
    });

    useEffect(() => {
        setSelectedPomodoroFormat(() => {
            if (formats) {
                const foundFormat = formats?.find((option) => {
                    if (option.id === selectedId) {
                        return option;
                    }
                });
                return (
                    foundFormat ?? {
                        id: '-1',
                        userId: '-1',
                        name: 'New Pomodoro Format',
                        workDuration: `${DEFAULT_WORK_TIME}`,
                        breakDuration: `${DEFAULT_BREAK_TIME}`,
                        longBreakDuration: `${DEFAULT_LONG_BREAK_TIME}`,
                        autoStartTimer: false,
                    }
                );
            } else {
                return {
                    id: '-1',
                    userId: '-1',
                    name: 'New Pomodoro Format',
                    workDuration: `${DEFAULT_WORK_TIME}`,
                    breakDuration: `${DEFAULT_BREAK_TIME}`,
                    longBreakDuration: `${DEFAULT_LONG_BREAK_TIME}`,
                    autoStartTimer: false,
                };
            }
        });
    }, [formats, selectedId]);

    return { selectedPomodoroFormat, setSelectedPomodoroFormat };
}
