import { trpc } from '../../../utils/trpc';

export default function useCreatePomodoroFormat() {
    const context = trpc.useContext();
    const { mutate: create } = trpc.pomodoro.format.createPomodoroFormat.useMutation({
        onSuccess(data) {
            context.pomodoro.format.invalidate();
        },
    });
    return { create };
}
