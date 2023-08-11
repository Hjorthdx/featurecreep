import { trpc } from '../../utils/trpc';

export default function useGetUsersSelectedExpansions() {
    const { data: selectedExpansions } = trpc.dune.getUsersSelectedExpansions.useQuery();
    if (!selectedExpansions) return { selectedExpansions: { riseOfIX: false, immortality: false } };
    return { selectedExpansions };
}
