import { trpc } from '../../utils/trpc';

export default function useGetTasks() {
    const { data: tasks } = trpc.useQuery(['pomodoro.task.getTasks']);

    return { tasks };
}
