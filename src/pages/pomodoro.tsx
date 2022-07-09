import { NextApiRequest, NextApiResponse } from 'next';
import { useState } from 'react';
import PomodoroTimer from '../components/pomodoro/pomodoroTimer';
import PomodoroSettingsPopup from '../components/popups/pomodoroSettingsPopup';
import Popup from '../components/popups/popup';
import { trpc } from '../utils/trpc';

function Pomodoro(req: NextApiRequest, res: NextApiResponse) {
    const [show, setShow] = useState(false);
    /*
    const client = trpc.useContext();
    const { mutate } = trpc.useMutation('pomodoro.startPomodoro', {
        onSuccess(data, variables, context) {
            console.log('onSuccess', data, variables, context);
            client.invalidateQueries(['pomodoro.getAll']);
        },
    });
    const { data: pomodoros } = trpc.useQuery(['pomodoro.getAll']);
*/
    return (
        <div className='flex flex-col items-center min-h-screen p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0 bg-zinc-300 '>
            <PomodoroSettingsPopup show={show} handleClose={() => setShow((show) => !show)} />
            <PomodoroTimer setShow={() => setShow((show) => !show)} />
        </div>
    );
}

export default Pomodoro;
/*
<button
                onClick={() => {
                    console.log('onClick!');
                    setStart(true);
                    mutate({
                        workDuration: 25,
                        breakDuration: 5,
                    });
                }}
            >
                Add new Pomodoro (25/5)
            </button>
            {pomodoros &&
                pomodoros.map((pomodoro, index) => {
                    return <div key={index}>{pomodoro.createdAt.toLocaleString()}</div>;
                })}*/
