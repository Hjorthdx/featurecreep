import { useState } from 'react';
import PomodoroTaskItemDialog from '../dialogs/pomodoroTaskItemDialog';
import Checkbox from '../interactables/checkbox';
import TaskItemDropdown from '../interactables/dropdowns/taskItemDropdown';
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
            <PomodoroTaskItemDialog task={task} enabled={show} closeDialog={() => setShow(false)} onRename={onRename} />
            <Checkbox label={task.label} onClick={(checked: boolean) => onClick(task, checked)} checked={task.checked} />
            <TaskItemDropdown onRename={() => setShow(true)} onDelete={() => onDelete((t) => t.id !== task.id)} />
        </div>
    );
}