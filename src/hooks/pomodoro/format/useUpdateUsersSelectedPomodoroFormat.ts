import { trpc } from '../../../utils/trpc';

export default function useUpdateUsersSelectedPomodoroFormat() {
    const context = trpc.useContext();
    const { mutate: updateUsersSelectedPomodoroFormat } = trpc.pomodoro.format.updateUsersSelectedPomodoroFormat.useMutation(
        {
            onSuccess() {
                context.pomodoro.format.getSelectedPomodoroFormat.invalidate();
            },
        }
    );

    return { updateUsersSelectedPomodoroFormat };
}
