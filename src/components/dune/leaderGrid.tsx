import LeaderCell from './leaderCell';

interface DuneLeader {
    name: string;
    image: string;
    expansion: string;
}

const baseLeaders: DuneLeader[] = [
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

const riseOfIXLeaders: DuneLeader[] = [
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

const leaders = [...baseLeaders, ...riseOfIXLeaders];

export default function LeaderGrid() {
    return (
        <main className='grid grid-cols-1 gap-10 p-5 md:p-0 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {leaders.map((leader) => (
                <LeaderCell key={leader.name} name={leader.name} image={leader.image} />
            ))}
        </main>
    );
}
