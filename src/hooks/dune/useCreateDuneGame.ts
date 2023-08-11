import { trpc } from '../../utils/trpc';

export default function useCreateDuneGame() {
    const context = trpc.useContext();
    const { mutate: create } = trpc.dune.createDuneGameForLeader.useMutation({
        onSuccess(data) {
            context.dune.getGames.invalidate();
        },
    });

    return { create };
}
