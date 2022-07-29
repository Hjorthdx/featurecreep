import { useState } from 'react';
import Checkbox from '../interactables/checkbox';
import TaskDropdown from '../interactables/dropdowns/taskDropdown';
import PomodoroTaskItemPopup from '../popups/pomodoroTaskItemPopup';
import { Task } from './tasks';

interface Props {
    task: Task;
    onClick: (task: Task, checked: boolean) => void;
    onRename: (task: Task, label: string) => void;
    onDelete: (filter?: (task: Task) => boolean) => void;
}

export default function TaskItem({ task, onClick, onRename, onDelete }: Props) {
    const [show, setShow] = useState(false);

    return (
        <div className='flex flex-row px-2 py-1 mb-4 justify-between bg-white rounded-lg border border-gray-800'>
            <PomodoroTaskItemPopup
                show={show}
                handleClose={() => setShow(false)}
                task={task}
                onSave={(label: string) => onRename(task, label)}
            />
            <Checkbox label={task.label} onClick={(checked: boolean) => onClick(task, checked)} checked={task.checked} />
            <TaskDropdown onRename={() => setShow(!show)} onDelete={() => onDelete((t) => t.id !== task.id)} />
        </div>
    );
}
