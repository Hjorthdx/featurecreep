// I suppose more config ish...
export const DEFAULT_WORK_TIME = 25;
export const DEFAULT_BREAK_TIME = 5;
export const DEFAULT_LONG_BREAK_TIME = 15;

// Constants
export const SECONDS_IN_A_MINUTE = 60;
export const SECONDS_IN_AN_HOUR = SECONDS_IN_A_MINUTE * 60;
export const SECONDS_IN_A_DAY = SECONDS_IN_AN_HOUR * 24;

// Dune
import { DuneLeader } from './types/dune';
export const BASE_LEADERS: DuneLeader[] = [
    {
        name: 'Earl Memnon Thorvald',
        image: '/Earl-Memnon-Thorvald.png',
        expansion: 'Base',
    },
    {
        name: 'Countess Ariana Thorvald',
        image: '/Countess-Ariana-Thorvald.png',
        expansion: 'Base',
    },
    {
        name: 'Paul Atreides',
        image: '/Paul-Atreides.png',
        expansion: 'Base',
    },
    {
        name: 'Duke Leto Atreides',
        image: '/Duke-Leto-Atreides.png',
        expansion: 'Base',
    },
    {
        name: 'Glossu "The Beast" Rabban',
        image: '/Glossu-The-Beast-Rabban.png',
        expansion: 'Base',
    },
    {
        name: 'Baron Vladimir Harkonnen',
        image: '/Baron-Vladimir-Harkonnen.png',
        expansion: 'Base',
    },
    {
        name: 'Count Ilban Richese',
        image: '/Count-Ilban-Richese.png',
        expansion: 'Base',
    },
    {
        name: 'Helena Richese',
        image: '/Helena-Richese.png',
        expansion: 'Base',
    },
];

export const BASE_RISE_OF_IX_LEADERS: DuneLeader[] = [
    {
        name: '"Princess" Yuna Moritani',
        image: '/Princess-Yuna-Moritani.png',
        expansion: 'Rise of IX',
    },
    {
        name: 'Viscount Hundro Moritani',
        image: '/Viscount-Hundro-Moritani.png',
        expansion: 'Rise of IX',
    },
    {
        name: 'Ilesa Ecaz',
        image: '/Ilesa-Ecaz.png',
        expansion: 'Rise of IX',
    },
    {
        name: 'Archduke Armand Ecaz',
        image: '/Archduke-Armand-Ecaz.png',
        expansion: 'Rise of IX',
    },
    {
        name: 'Tessia Vernius',
        image: '/Tessia-Vernius.png',
        expansion: 'Rise of IX',
    },
    {
        name: 'Prince Rhombur Vernius',
        image: '/Prince-Rhombur-Vernius.png',
        expansion: 'Rise of IX',
    },
];
