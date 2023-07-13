import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Head from '../components/head';
import Navbar from '../components/navbar';
import PomodoroTimer from '../components/pomodoro/pomodoroTimer';
import Tasks from '../components/pomodoro/tasks';
import PomodoroSettingsPopup from '../components/popups/pomodoroSettingsPopup';

// TODO: Change all the popups to make use of Radix
export default function Pomodoro(req: NextApiRequest, res: NextApiResponse) {
    const { status } = useSession({
        required: false, // TEMP was true
    });
    const [show, setShow] = useState(false);

    if (status === 'loading') {
        return <div>loading</div>;
    }

    return (
        <div className='bg-amber-2'>
            <Head title='FeatureCreep - Pomodoro' />
            <Navbar />
            <div className='flex flex-col items-center min-h-screen p-5'>
                <PomodoroSettingsPopup show={show} handleClose={() => setShow((show) => !show)} />
                <div className='space-y-4'>
                    <PomodoroTimer show={show} setShow={() => setShow((show) => !show)} />
                    <Tasks />
                </div>
            </div>
        </div>
    );
}
