import { trpc } from '../../utils/trpc';

export default function useUpdateUsersSelectedExpansions() {
    const context = trpc.useContext();
    const { mutate: updateUsersSelectedExpansions } = trpc.dune.updateUsersSelectedExpansions.useMutation({
        onSuccess() {
            context.dune.invalidate();
        },
    });

    return { updateUsersSelectedExpansions };
}
