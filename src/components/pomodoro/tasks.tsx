import { useRef, ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
// Perhabs group hooks together to get something like this?
// import { useCreateTask, useGetTasks } from '../../hooks/pomodoro';
import TaskItem from './taskItem';
import useLocalStorage from '../../hooks/useLocalStorage';
import TaskDropdown from '../interactables/taskDropdown';
import AddButton from '../interactables/addButton';

export interface Task {
    id: string;
    label: string;
    checked: boolean;
}

export default function Tasks() {
    const { value: tasks, setValue: setTasks } = useLocalStorage<Task[]>({ key: 'tasks', defaultValue: [] });
    const inputRef = useRef<HTMLInputElement>(null);

    if (!tasks) {
        return null;
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        if (inputRef.current) {
            inputRef.current.value = e.target.value;
        }
    }

    function handleNewTaskClick() {
        if (!inputRef.current) {
            return;
        }
        if (inputRef.current.value.length === 0) {
            return;
        }
        const newTask = {
            id: inputRef.current.value + '@' + new Date().toLocaleDateString(),
            label: inputRef.current.value,
            checked: false,
        };
        setTasks((tasks) => [...tasks, newTask]);
        inputRef.current.value = '';
    }

    function handleKeyDown(e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleNewTaskClick();
        }
    }

    function onTaskClick(task: Task, checked: boolean) {
        setTasks((tasks) =>
            tasks.map((existingTask) => {
                if (existingTask.id === task.id) {
                    return { ...task, checked: checked };
                } else {
                    return existingTask;
                }
            })
        );
    }

    function onTaskDelete(filter?: (task: Task) => boolean) {
        if (!filter) {
            setTasks([]);
            return;
        }
        setTasks((tasks) => tasks.filter(filter));
    }

    return (
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <div className='p-5 py-5 inline-flex justify-between w-full'>
                <input
                    ref={inputRef}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-3'
                    type='text'
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    placeholder='Please insert task name'
                />
                {/* Should this add button even be here?
                 Or do I only accept enter as a way to add? */}
                <AddButton onClick={handleNewTaskClick} />
                <TaskDropdown onTaskDelete={onTaskDelete} />
            </div>
            <div className='p-5 py-5'>
                {tasks.map((task, index) => (
                    <TaskItem key={index} task={task} onClick={onTaskClick} />
                ))}
            </div>
        </div>
    );
}
