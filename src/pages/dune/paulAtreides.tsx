import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from 'next-auth/react';

export default function PaulAtreides(req: NextApiRequest, res: NextApiResponse) {
    const { status } = useSession({
        required: true,
    });

    if (status === 'loading') {
        return <div>loading</div>;
    }

    return <div className='bg-zinc-300'>Paul</div>;
}
