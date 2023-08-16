import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from 'next-auth/react';
import Head from '../components/head';
import Navbar from '../components/navbar';
import LeaderGrid from '../components/dune/leaderGrid';

export default function Dune(req: NextApiRequest, res: NextApiResponse) {
    const { status } = useSession({
        required: true,
    });

    if (status === 'loading') {
        return <div>loading</div>;
    }

    return (
        <div className='bg-zinc-300'>
            <Head title='FeatureCreep - Dune' />
            <Navbar />
            <div className='flex flex-col min-h-screen p-5'>
                <LeaderGrid />
            </div>
        </div>
    );
}
