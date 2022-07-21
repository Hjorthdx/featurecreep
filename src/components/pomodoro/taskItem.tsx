import Checkbox from '../interactables/checkbox';
import TaskDropdown from '../interactables/dropdowns/taskDropdown';
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
        <div className='flex flex-row px-2 py-1 mb-4 justify-between bg-white rounded-lg border border-gray-800'>
            <Checkbox label={task.label} onClick={handleClick} checked={task.checked} />
            <TaskDropdown />
        </div>
    );
}
