import { useState, useEffect } from 'react';
import { PomodoroFormat } from '@prisma/client';

interface Props {
    formats: PomodoroFormat[];
    selectedId: string;
}

export default function useSelectedPomodoroFormat({ formats, selectedId }: Props) {
    const [selectedPomodoroFormat, setSelectedPomodoroFormat] = useState({
        name: 'New Pomodoro Format',
        workDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15,
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
                        name: 'New Pomodoro Format',
                        workDuration: 25,
                        breakDuration: 5,
                        longBreakDuration: 15,
                    }
                );
            } else
                return {
                    name: 'New Pomodoro Format',
                    workDuration: 25,
                    breakDuration: 5,
                    longBreakDuration: 15,
                };
        });
    }, [formats, selectedId]);

    return { selectedPomodoroFormat, setSelectedPomodoroFormat };
}
