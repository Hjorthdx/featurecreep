import { trpc } from '../../utils/trpc';

export default function useUpdatePomodoroFormat() {
    const context = trpc.useContext();
    const { mutate: update } = trpc.useMutation('pomodoro.format.updatePomodoroFormat', {
        onSuccess() {
            context.invalidateQueries(['pomodoro.format.getSelectedPomodoroFormat']);
        },
    });
    return { update };
}
