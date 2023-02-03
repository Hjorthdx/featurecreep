import { trpc } from '../../utils/trpc';

export default function useGetUsersSelectedExpansions() {
    const { data: selectedExpansions } = trpc.useQuery(['dune.getUsersSelectedExpansions']);

    return { selectedExpansions };
}
