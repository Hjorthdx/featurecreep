import { trpc } from '../../../utils/trpc';

interface Props {
    userId: string;
}

export default function useGetAllOfUsersPomodoroFormats({ userId }: Props) {
    const { data: formats } = trpc.useQuery([
        'pomodoro.format.getAllOfUsersPomodoroFormats',
        {
            userId: userId,
        },
    ]);
    return { formats: formats ?? [] };
}
