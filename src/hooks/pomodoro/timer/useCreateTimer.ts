import { trpc } from '../../../utils/trpc';

export default function useCreateTimer() {
    const { mutate: createTimer } = trpc.useMutation('pomodoro.timer.createTimer');
    return { create: createTimer };
}
