import { trpc } from '../../../utils/trpc';
import { DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_LONG_BREAK_TIME } from '../../../constants';
import { PomodoroFormat } from 'prisma/prisma-client';

interface Props {
    pomodoroFormatId: string;
}

export default function useGetSelectedPomodoroFormat({ pomodoroFormatId }: Props) {
    const { data: selectedPomodoroFormat } = trpc.useQuery([
        'pomodoro.format.getSelectedPomodoroFormat',
        {
            pomodoroFormatId: pomodoroFormatId,
        },
    ]);

    if (selectedPomodoroFormat == null || selectedPomodoroFormat == undefined) {
        return {
            selectedPomodoroFormat: {
                workDuration: DEFAULT_WORK_TIME,
                breakDuration: DEFAULT_BREAK_TIME,
                longBreakDuration: DEFAULT_LONG_BREAK_TIME,
                autoStartTimer: false,
            },
        };
    }

    return { selectedPomodoroFormat };
}
