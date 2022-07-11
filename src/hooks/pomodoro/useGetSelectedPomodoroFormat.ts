import { trpc } from '../../utils/trpc';

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

    return { selectedPomodoroFormat };
}
