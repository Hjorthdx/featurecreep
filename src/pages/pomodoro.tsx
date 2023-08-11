import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from 'next-auth/react';
import Head from '../components/head';
import Navbar from '../components/navbar';
import PomodoroTimer from '../components/pomodoro/pomodoroTimer';
import Tasks from '../components/pomodoro/tasks';

// TODO: Change all the popups to make use of Radix
export default function Pomodoro(req: NextApiRequest, res: NextApiResponse) {
    const { status } = useSession({
        required: false, // TEMP was true
    });

    if (status === 'loading') {
        return <div>loading</div>;
    }

    return (
        <div className='bg-amber-2'>
            <Head title='FeatureCreep - Pomodoro' />
            <Navbar />
            <div className='flex flex-col items-center min-h-screen p-5'>
                <div>
                    <PomodoroTimer />
                    <Tasks />
                </div>
            </div>
        </div>
    );
}
