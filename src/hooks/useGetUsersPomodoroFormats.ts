import { trpc } from '../utils/trpc';

interface Props {
    userId: string;
}

export default function useGetUsersPomodoroFormats({ userId }: Props) {
    const { data: formats } = trpc.useQuery([
        'pomodoro.getUsersPomodoroFormats',
        {
            userId: userId,
        },
    ]);

    return { formats };
}
