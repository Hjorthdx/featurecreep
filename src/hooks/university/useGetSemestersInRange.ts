import { trpc } from '../../utils/trpc';

interface Props {
    lower: number;
    upper: number;
}

export default function useGetSemestersInRange({ lower, upper }: Props) {
    const { data } = trpc.useQuery(['university.getSemesterInRange',
        { lower: lower, upper: upper }]);

    return { semesters: data ?? [] }
}
