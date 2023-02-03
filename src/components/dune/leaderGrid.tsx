import React, { useState } from 'react';
import LeaderCell from './leaderCell';
import { BASE_LEADERS, BASE_RISE_OF_IX_LEADERS } from '../../constants';
import { DuneLeader, Expansions } from '../../types/dune';
import useUpdateUsersSelectedExpansions from '../../hooks/dune/useUpdateUsersSelectedExpansions';
import useGetUsersSelectedExpansions from '../../hooks/dune/useGetUsersSelectedExpansions';

type Expansion = keyof Expansions;

export default function LeaderGrid() {
    const { updateUsersSelectedExpansions } = useUpdateUsersSelectedExpansions();
    const { selectedExpansions } = useGetUsersSelectedExpansions();
    const [expansions, setExpansions] = useState<Expansions>({
        riseOfIX: selectedExpansions?.riseOfIX ?? false,
        immortality: selectedExpansions?.immortality ?? false,
    });

    const handleExpansionChange = (checked: boolean, expansion: Expansion) => {
        setExpansions({
            ...expansions,
            [expansion]: checked,
        });
        updateUsersSelectedExpansions({
            [expansion]: checked,
        });
    };

    let leaders: DuneLeader[] = BASE_LEADERS;

    if (expansions.riseOfIX) {
        leaders = [...leaders, ...BASE_RISE_OF_IX_LEADERS];
    }

    // Needs to do something about this checkbox area probably...
    // It's just a draft bro
    return (
        <>
            <div className='flex mb-5'>
                <label className='mr-5'>
                    <input
                        type='checkbox'
                        checked={expansions.riseOfIX}
                        onChange={(e) => handleExpansionChange(e.target.checked, 'riseOfIX')}
                    />
                    Rise of IX
                </label>
                <label>
                    <input
                        type='checkbox'
                        checked={expansions.immortality}
                        onChange={(e) => handleExpansionChange(e.target.checked, 'immortality')}
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
