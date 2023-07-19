import { trpc } from '../../../utils/trpc';

export default function useCreateTimer() {
    const { mutate: createTimer } = trpc.pomodoro.timer.createTimer.useMutation();
    return { create: createTimer };
}
