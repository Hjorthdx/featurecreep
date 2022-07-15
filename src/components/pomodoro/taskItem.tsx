import { useDispatch } from 'react-redux';
import { Task } from 'prisma/prisma-client';
import Checkbox from '../buttons/checkbox';
import { addCompletedTask, removeCompletedTask } from '../../redux/pomodoroSlice';

interface Props {
    task: Task;
}

export default function TaskItem({ task }: Props) {
    const dispatch = useDispatch();

    function handleClick(checked: boolean) {
        if (checked) {
            dispatch(removeCompletedTask(task));
        } else {
            dispatch(addCompletedTask(task));
        }
    }

    return (
        <div className='flex flex-col p-2 items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <Checkbox label={task.name} onClick={handleClick} />
        </div>
    );
}
