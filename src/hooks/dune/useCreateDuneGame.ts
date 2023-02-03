import { trpc } from '../../utils/trpc';

export default function useCreateDuneGame() {
    const context = trpc.useContext();
    const { mutate: create } = trpc.useMutation('dune.createDuneGameForLeader', {
        onSuccess(data) {
            // Not sure if the object with userId actually does anything
            context.invalidateQueries(['dune.getGames', { userId: data.userId }]);
        },
    });

    return { create };
}
