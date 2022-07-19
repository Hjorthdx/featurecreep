import { useDispatch } from 'react-redux';
import Checkbox from '../buttons/checkbox';
import { addCompletedTask, removeCompletedTask } from '../../redux/pomodoroSlice';

interface Props {
    task: string;
}

export default function Task({ task }: Props) {
    const dispatch = useDispatch();

    function handleClick(checked: boolean) {
        if (checked) {
        } else {
        }
    }

    return (
        <div className='flex flex-col p-2 items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <Checkbox label={task} onClick={handleClick} />
        </div>
    );
}
