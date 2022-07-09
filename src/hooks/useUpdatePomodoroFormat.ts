import { trpc } from '../utils/trpc';

export default function useUpdatePomodoroFormat() {
    const context = trpc.useContext();
    const { mutate: update } = trpc.useMutation('pomodoro.updatePomodoroFormat', {
        onSuccess() {
            context.invalidateQueries(['pomodoro.getUsersPomodoroFormats']);
        },
    });
    return { update };
}
