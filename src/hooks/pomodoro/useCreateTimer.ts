import { trpc } from '../../utils/trpc';

export default function useCreateTimer() {
    const { mutate: create } = trpc.useMutation('pomodoro.timer.createTimer');
    return { create };
}
