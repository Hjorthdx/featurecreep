import { trpc } from '../../utils/trpc';

export default function useCreatePomodoroFormat() {
    const context = trpc.useContext();
    const { mutate: create } = trpc.useMutation('pomodoro.format.createPomodoroFormat', {
        onSuccess(data) {
            context.invalidateQueries(['pomodoro.format.getSelectedPomodoroFormat']);
        },
    });
    return { create };
}
