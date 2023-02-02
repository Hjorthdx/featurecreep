import { DuneGame } from 'prisma/prisma-client';

interface Props {
    games: DuneGame[];
    name: string;
}

export default function useLeaderOverviewStats({ games, name }: Props) {
    const gamesWon = games.reduce((acc, game) => {
        return game.firstPlacement == name ? acc + 1 : acc;
    }, 0);

    const averagePlacmentFirstPosition =
        games.reduce((acc, game) => {
            return game.firstPlacement == name ? acc + 1 : acc;
        }, 0) / games.length;

    const averagePlacmentSecondPosition =
        games.reduce((acc, game) => {
            return game.secondPlacement == name ? acc + 1 : acc;
        }, 0) / games.length;

    const averagePlacmentThirdPosition =
        games.reduce((acc, game) => {
            return game.thirdPlacement == name ? acc + 1 : acc;
        }, 0) / games.length;

    const averagePlacmentFourthPosition =
        games.reduce((acc, game) => {
            return game.fourthPlacement == name ? acc + 1 : acc;
        }, 0) / games.length;

    return {
        gamesWon,
        averagePlacmentFirstPosition,
        averagePlacmentSecondPosition,
        averagePlacmentThirdPosition,
        averagePlacmentFourthPosition,
    };
}
