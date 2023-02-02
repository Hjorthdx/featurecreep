import { DuneGame } from 'prisma/prisma-client';

interface Props {
    games: DuneGame[];
    name: string;
}

export default function useLeaderStats({ games, name }: Props) {
    const gamesWon = games.reduce((acc, game) => {
        return game.firstPlacement == name ? acc + 1 : acc;
    }, 0);

    const winrate = (gamesWon / games.length) * 100;

    const averagePlacement =
        games.reduce((acc, game) => {
            if (game.firstPlacement == name) {
                return acc + 1;
            } else if (game.secondPlacement == name) {
                return acc + 2;
            } else if (game.thirdPlacement == name) {
                return acc + 3;
            } else if (game.fourthPlacement == name) {
                return acc + 4;
            } else {
                return acc;
            }
        }, 0) / games.length;

    const firstPositionGames = games.reduce((acc, game) => {
        return game.firstPlacement == name ? acc + 1 : acc;
    }, 0);

    const averagePlacementFirstPosition = firstPositionGames / games.length;

    const secondPositionGames = games.reduce((acc, game) => {
        return game.secondPlacement == name ? acc + 1 : acc;
    }, 0);

    const averagePlacementSecondPosition = secondPositionGames / games.length;

    const thirdPositionGames = games.reduce((acc, game) => {
        return game.thirdPlacement == name ? acc + 1 : acc;
    }, 0);

    const averagePlacementThirdPosition = thirdPositionGames / games.length;

    const fourthPositionGames = games.reduce((acc, game) => {
        return game.fourthPlacement == name ? acc + 1 : acc;
    }, 0);
    const averagePlacementFourthPosition = fourthPositionGames / games.length;

    return {
        gamesWon,
        winrate,
        averagePlacement,
        firstPositionGames,
        averagePlacementFirstPosition,
        secondPositionGames,
        averagePlacementSecondPosition,
        thirdPositionGames,
        averagePlacementThirdPosition,
        fourthPositionGames,
        averagePlacementFourthPosition,
    };
}
