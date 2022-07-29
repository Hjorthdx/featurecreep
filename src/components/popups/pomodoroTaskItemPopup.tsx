import { useState } from 'react';
import { Task } from '../pomodoro/tasks';
import Popup from './popup';
import PopupFooter from './popupFooter';
import PopupHeader from './popupHeader';

interface Props {
    show: boolean;
    handleClose: () => void;
    task: Task;
    onSave: (label: string) => void;
}

export default function PomodoroTaskItemPopup({ show, handleClose, task, onSave }: Props) {
    const [label, setLabel] = useState(task.label);

    function handleSave() {
        onSave(label);
        handleClose();
    }

    return (
        <Popup show={show}>
            <PopupHeader title='Rename task' handleClose={handleClose} />
            <div className='relative px-5 py-4 flex-auto'>
                <div className='mb-2'>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type='text'
                        placeholder={task.label}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLabel(event.currentTarget.value)}
                    />
                </div>
            </div>
            <PopupFooter handleClose={handleClose} handleSave={handleSave} />
        </Popup>
    );
}
