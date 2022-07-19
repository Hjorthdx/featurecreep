import { trpc } from '../../../utils/trpc';

export default function useUpdateUsersSelectedPomodoroFormat() {
    const context = trpc.useContext();
    const { mutate: updateUsersSelectedPomodoroFormat } = trpc.useMutation(
        'pomodoro.format.updateUsersSelectedPomodoroFormat',
        {
            onSuccess() {
                context.invalidateQueries(['pomodoro.format.getSelectedPomodoroFormat']);
            },
        }
    );

    return { updateUsersSelectedPomodoroFormat };
}
