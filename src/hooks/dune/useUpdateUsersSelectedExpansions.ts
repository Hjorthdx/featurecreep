import { trpc } from '../../utils/trpc';

export default function useUpdateUsersSelectedExpansions() {
    const context = trpc.useContext();
    const { mutate: updateUsersSelectedExpansions } = trpc.useMutation('dune.updateUsersSelectedExpansions', {
        onSuccess() {
            context.invalidateQueries(['dune.getGames']);
            context.invalidateQueries(['dune.getUsersSelectedExpansions']);
        },
    });

    return { updateUsersSelectedExpansions };
}
