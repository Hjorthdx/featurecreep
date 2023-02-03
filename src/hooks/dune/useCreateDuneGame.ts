import { trpc } from '../../utils/trpc';

export default function useCreateDuneGame() {
    const context = trpc.useContext();
    const { mutate: create } = trpc.useMutation('dune.createDuneGameForLeader', {
        onSuccess(data) {
            // Not sure if the object with userId actually does anything
            context.invalidateQueries(['dune.getGamesForUser', { userId: data.userId }]);
            context.invalidateQueries(['dune.getGamesWithLeaderForUser', { userId: data.userId, leader: data.userLeader }]);
        },
    });

    return { create };
}
