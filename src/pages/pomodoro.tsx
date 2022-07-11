import { NextApiRequest, NextApiResponse } from 'next';
import { useState } from 'react';
import PomodoroTimer from '../components/pomodoro/pomodoroTimer';
import PomodoroSettingsPopup from '../components/popups/pomodoroSettingsPopup';

export default function Pomodoro(req: NextApiRequest, res: NextApiResponse) {
    const [show, setShow] = useState(false);

    return (
        <div className='flex flex-col items-center min-h-screen p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0 bg-zinc-300 '>
            <PomodoroSettingsPopup show={show} handleClose={() => setShow((show) => !show)} />
            <PomodoroTimer setShow={() => setShow((show) => !show)} />
        </div>
    );
}
