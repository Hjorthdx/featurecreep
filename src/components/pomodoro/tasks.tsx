import { useRef, ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// Perhabs group hooks together to get something like this?
// import { useCreateTask, useGetTasks } from '../../hooks/pomodoro';
import TaskItem from './taskItem';
import useLocalStorage from '../../hooks/useLocalStorage';
import AddButton from '../interactables/buttons/addButton';
import TaskDropdown from '../interactables/dropdowns/taskDropdown';

export interface Task {
    id: string;
    label: string;
    checked: boolean;
}

export default function Tasks() {
    const { value: tasks, setValue: setTasks } = useLocalStorage<Task[]>({ key: 'tasks', defaultValue: [] });
    const inputRef = useRef<HTMLInputElement>(null);
    const [tasksRef] = useAutoAnimate<HTMLDivElement>(/* optional config */);

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

    // Merge these two functions into one ?
    // Any suggestions for nice ways of doing this?
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

    function onTaskRename(task: Task, label: string) {
        setTasks((tasks) =>
            tasks.map((existingTask) => {
                if (existingTask.id === task.id) {
                    return { ...task, label: label };
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
        <div className='flex flex-col items-center'>
            <div className='pb-5 inline-flex justify-between w-full'>
                <input
                    ref={inputRef}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-amber-12 bg-amber-3 focus:bg-amber-4 leading-tight focus:outline-none focus:shadow-outline mr-3 border-amber-7 focus:border-amber-8 placeholder-amber-11'
                    type='text'
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    placeholder='Please insert task name'
                />
                <AddButton onClick={handleNewTaskClick} />
                <TaskDropdown onTaskDelete={onTaskDelete} taskCount={tasks.length} />
            </div>
            <div ref={tasksRef} className='w-full'>
                {tasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        onClick={onTaskClick}
                        onRename={onTaskRename}
                        onDelete={onTaskDelete}
                    />
                ))}
            </div>
        </div>
    );
}
