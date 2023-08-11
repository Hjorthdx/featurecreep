import { trpc } from '../../../utils/trpc';
import { DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_LONG_BREAK_TIME } from '../../../constants';

interface Props {
    pomodoroFormatId: string;
}

export default function useGetSelectedPomodoroFormat({ pomodoroFormatId }: Props) {
    const { data: selectedPomodoroFormat } = trpc.pomodoro.format.getSelectedPomodoroFormat.useQuery({
        pomodoroFormatId: pomodoroFormatId,
    });

    if (!selectedPomodoroFormat) {
        return {
            selectedPomodoroFormat: {
                id: '-1',
                userId: '-1',
                name: '-1',
                workDuration: DEFAULT_WORK_TIME.toString(),
                breakDuration: DEFAULT_BREAK_TIME.toString(),
                longBreakDuration: DEFAULT_LONG_BREAK_TIME.toString(),
                autoStartTimer: false,
            },
        };
    }

    return { selectedPomodoroFormat };
}
