import { useState, useEffect, useRef, ChangeEvent } from 'react';
// Perhabs group hooks together to get something like this?
// import { useCreateTask, useGetTasks } from '../../hooks/pomodoro';
import Task from './task';

function Tasks() {
    const [tasks, setTasks] = useState<string[]>([]);
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
        setTasks((tasks) => [...tasks, inputRef.current?.value ?? '']);
    }

    return (
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <label>Tasks</label>
            <input ref={inputRef} type='text' onChange={onChange} placeholder='Please insert task name' />
            <button onClick={handleNewTaskClick}>Click me to add task!</button>
            <div className='p-5 py-5'>
                {tasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}
            </div>
        </div>
    );
}

export default Tasks;
