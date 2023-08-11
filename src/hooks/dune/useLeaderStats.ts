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

    // First position
    const firstPositionGames = games.reduce((acc, game) => {
        return game.firstPosition == name ? acc + 1 : acc;
    }, 0);
    const averagePlacementFirstPosition =
        games.reduce((acc, game) => {
            return game.firstPlacement == name && game.firstPosition == name ? acc + 1 : acc;
        }, 0) / firstPositionGames;

    // Second position
    const secondPositionGames = games.reduce((acc, game) => {
        return game.secondPosition == name ? acc + 1 : acc;
    }, 0);
    const averagePlacementSecondPosition =
        games.reduce((acc, game) => {
            return game.firstPlacement == name && game.secondPosition == name ? acc + 1 : acc;
        }, 0) / secondPositionGames;

    // Third position
    const thirdPositionGames = games.reduce((acc, game) => {
        return game.thirdPosition == name ? acc + 1 : acc;
    }, 0);
    const averagePlacementThirdPosition =
        games.reduce((acc, game) => {
            return game.firstPlacement == name && game.thirdPosition == name ? acc + 1 : acc;
        }, 0) / thirdPositionGames;

    // Fourth position
    const fourthPositionGames = games.reduce((acc, game) => {
        return game.fourthPosition == name ? acc + 1 : acc;
    }, 0);
    const averagePlacementFourthPosition =
        games.reduce((acc, game) => {
            return game.firstPlacement == name && game.fourthPosition == name ? acc + 1 : acc;
        }, 0) / fourthPositionGames;

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
