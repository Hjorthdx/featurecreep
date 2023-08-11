import { trpc } from '../../../utils/trpc';

export default function useUpdatePomodoroFormat() {
    const context = trpc.useContext();
    const { mutate: update } = trpc.pomodoro.format.updatePomodoroFormat.useMutation({
        onSuccess() {
            context.pomodoro.format.invalidate();
        },
    });
    return { update };
}
