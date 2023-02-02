import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from '../../components/head';
import Navbar from '../../components/navbar';
import LeaderStats from '../../components/dune/LeaderStats';
import MatchHistory from '../../components/dune/MatchHistory';

export default function Leader(req: NextApiRequest, res: NextApiResponse) {
    const { status } = useSession({
        required: true,
    });

    const router = useRouter();
    const leader = router.query.leader;

    if (typeof leader !== 'string') {
        // Very unexpected if this happens.
        return <div>Passed leader name param was not a string</div>;
    }

    if (status === 'loading') {
        return <div>loading</div>;
    }

    return (
        <div className='bg-zinc-300'>
            <Head title={'FeatureCreep - ' + String(leader) ?? 'Dune'} />
            <Navbar />
            <div className='flex flex-col items-center min-h-screen p-5'>
                <div className='space-y-4'>
                    <LeaderStats leader={leader} />
                    <MatchHistory leader={leader} />
                </div>
            </div>
        </div>
    );
}
