import { NextApiRequest, NextApiResponse } from 'next';
import { useState } from 'react';
import PomodoroTimer from '../components/pomodoro/pomodoroTimer';
import PomodoroSettingsPopup from '../components/popups/pomodoroSettingsPopup';
import { useSession } from 'next-auth/react';
import Tasks from '../components/pomodoro/tasks';

export default function Pomodoro(req: NextApiRequest, res: NextApiResponse) {
    const { status } = useSession({
        required: true,
    });
    const [show, setShow] = useState(false);

    if (status === 'loading') {
        return <div>loading</div>;
    }

    return (
        <div className='flex flex-col items-center min-h-screen p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0 bg-zinc-300'>
            <PomodoroSettingsPopup show={show} handleClose={() => setShow((show) => !show)} />
            <div className='space-y-4'>
                <PomodoroTimer setShow={() => setShow((show) => !show)} />
                <Tasks />
            </div>
        </div>
    );
}
