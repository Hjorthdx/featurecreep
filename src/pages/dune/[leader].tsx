import { NextApiRequest, NextApiResponse } from 'next';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from '../../components/head';
import Navbar from '../../components/navbar';
import LeaderStats from '../../components/dune/leaderStats';
import MatchHistory from '../../components/dune/matchHistory';
import DuneCreateGamePopup from '../../components/popups/duneCreateGamePopup';

export default function Leader(req: NextApiRequest, res: NextApiResponse) {
    const { status } = useSession({
        required: true,
    });

    const [show, setShow] = useState(false);

    const router = useRouter();
    const leader = router.query.leader ? String(router.query.leader) : '';
    const image = router.query.image ? String(router.query.image) : '';

    if (status === 'loading') {
        return <div>loading</div>;
    }

    return (
        <div className='bg-zinc-300'>
            <Head title={'FeatureCreep - ' + leader} />
            <Navbar />
            <div className='min-h-screen p-5'>
                <DuneCreateGamePopup show={show} handleClose={() => setShow((show) => !show)} leader={leader} />
                <div className='space-y-4'>
                    <LeaderStats leader={leader} image={image} />
                    <MatchHistory leader={leader} show={show} setShow={() => setShow((show) => !show)} />
                </div>
            </div>
        </div>
    );
}
