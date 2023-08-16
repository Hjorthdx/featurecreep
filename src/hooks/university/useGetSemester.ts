import { trpc } from '../../utils/trpc';

interface Props {
    semester: number;
}

export default function useGetSemester({ semester }: Props) {
    const { data } = trpc.university.getSemester.useQuery({ semester: semester });
    // TODO: Is this how I want to handle when no semester was found?
    return {
        semester: data ?? {
            number: 0,
            degreeType: '',
            projectName: '',
            projectArea: '',
            authors: '',
            description: '',
            tags: '',
            images: '',
            imageDescriptions: '',
            videos: '',
            videoDescriptions: '',
        },
    };
}
