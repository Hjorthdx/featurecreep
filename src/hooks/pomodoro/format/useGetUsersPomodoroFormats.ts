import { trpc } from '../../../utils/trpc';

interface Props {
    userId: string;
}

export default function useGetAllOfUsersPomodoroFormats({ userId }: Props) {
    const { data: formats } = trpc.pomodoro.format.getAllOfUsersPomodoroFormats.useQuery({
        userId: userId,
    });
    return { formats: formats ?? [] };
}
