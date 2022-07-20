import Checkbox from '../interactables/checkbox';
import { Task } from './tasks';

interface Props {
    task: Task;
    onClick: (task: Task, checked: boolean) => void;
}

export default function TaskItem({ task, onClick }: Props) {
    function handleClick(checked: boolean) {
        onClick(task, checked);
    }

    return (
        <div className='flex flex-col p-2 items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <Checkbox label={task.label} onClick={handleClick} checked={task.checked} />
        </div>
    );
}
