import { trpc } from '../../utils/trpc';

export default function useCreateTask() {
    const client = trpc.useContext();
    const { mutate: create } = trpc.useMutation('pomodoro.task.createTask', {
        onSuccess(data) {
            client.invalidateQueries(['pomodoro.task.getTasks']);
        },
    });
    return { create };
}
