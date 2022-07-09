import { trpc } from '../utils/trpc';

export default function useCreatePomodoroFormat() {
    const context = trpc.useContext();
    const { mutate: create } = trpc.useMutation('pomodoro.createPomodoroFormat', {
        onSuccess() {
            context.invalidateQueries(['pomodoro.getUsersPomodoroFormats']);
        },
    });
    return { create };
}
