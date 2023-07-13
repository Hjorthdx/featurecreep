import { useState } from 'react';
import Checkbox from '../interactables/checkbox';
import TaskItemDropdown from '../interactables/dropdowns/taskItemDropdown';
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
        <div className='flex flex-row px-2 py-1 mb-4 justify-between bg-amber-3 rounded-lg border border-amber-7'>
            <PomodoroTaskItemPopup
                show={show}
                handleClose={() => setShow(false)}
                task={task}
                onSave={(label: string) => onRename(task, label)}
            />
            <Checkbox label={task.label} onClick={(checked: boolean) => onClick(task, checked)} checked={task.checked} />
            <TaskItemDropdown onRename={() => setShow(!show)} onDelete={() => onDelete((t) => t.id !== task.id)} />
        </div>
    );
}
