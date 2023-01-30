import LeaderCell from './leaderCell';

interface DuneLeader {
    name: string;
    imageUrl: string;
}

const leaders: DuneLeader[] = [
    {
        name: 'Paul Atreides',
        imageUrl: '',
    },
];

export default function LeaderGrid() {
    return (
        <main className='grid items-start grid-cols-1 gap-10 p-5 md:p-0 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {leaders.map((leader) => (
                <LeaderCell key={leader.name} name={leader.name} />
            ))}
        </main>
    );
}
