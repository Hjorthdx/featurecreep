import React, { useState } from 'react';
import LeaderCell from './leaderCell';
import { BASE_LEADERS, BASE_RISE_OF_IX_LEADERS } from '../../constants';
import { DuneLeader, Expansions } from '../../types/dune';

type Expansion = 'IX' | 'Immortality';

export default function LeaderGrid() {
    const [expansions, setExpansions] = useState<Expansions>({
        IX: true,
        Immortality: true,
    });

    const handleExpansionChange = (expansion: Expansion) => {
        setExpansions({
            ...expansions,
            [expansion]: !expansions[expansion],
        });
    };

    let leaders: DuneLeader[] = BASE_LEADERS;

    if (expansions.IX) {
        leaders = [...leaders, ...BASE_RISE_OF_IX_LEADERS];
    }

    // Needs to do something about this checkbox area probably...
    // It's just a draft bro
    return (
        <>
            <div className='flex mb-5'>
                <label className='mr-5'>
                    <input type='checkbox' checked={expansions.IX} onChange={() => handleExpansionChange('IX')} />
                    Rise of IX
                </label>
                <label>
                    <input
                        type='checkbox'
                        checked={expansions.Immortality}
                        onChange={() => handleExpansionChange('Immortality')}
                    />
                    Immortality
                </label>
            </div>
            <main className='grid grid-cols-1 gap-10 p-5 md:p-0 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                {leaders.map((leader) => (
                    <LeaderCell key={leader.name} name={leader.name} image={leader.image} expansions={expansions} />
                ))}
            </main>
        </>
    );
}
