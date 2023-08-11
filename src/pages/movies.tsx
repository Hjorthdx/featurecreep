import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from 'next-auth/react';
import Head from '../components/head';
import Navbar from '../components/navbar';

export default function Dune(req: NextApiRequest, res: NextApiResponse) {
    const { status } = useSession({
        required: false, // TEMP was true
    });

    if (status === 'loading') {
        return <div>loading</div>;
    }

    return (
        <body>
        <div className='bg-blue-2'>
            <Head title='FeatureCreep - Dune' />
            <Navbar />
            <div className='flex-col min-h-screen p-5 w-full flex'>
            </div>
            </div>
        </body>
    );
}
