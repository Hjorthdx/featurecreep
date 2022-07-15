import { useState, useEffect, useRef, ChangeEvent } from 'react';
// Perhabs group hooks together to get something like this?
// import { useCreateTask, useGetTasks } from '../../hooks/pomodoro';
import useCreateTask from '../../hooks/pomodoro/useCreateTask';
import useGetTasks from '../../hooks/pomodoro/useGetTasks';
import TaskItem from './taskItem';

function Tasks() {
    const { tasks } = useGetTasks();
    const inputRef = useRef<HTMLInputElement>(null);
    const { create } = useCreateTask();

    if (!tasks) {
        return null;
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        if (inputRef.current) {
            inputRef.current.value = e.target.value;
        }
    }

    function handleNewTaskClick() {
        create(
            { name: inputRef.current?.value ?? '' },
            {
                onSuccess: (data) => {
                    if (inputRef.current) {
                        inputRef.current.value = '';
                    }
                },
            }
        );
    }

    return (
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <label>Tasks</label>
            <input ref={inputRef} type='text' onChange={onChange} placeholder='Please insert task name' />
            <button onClick={handleNewTaskClick}>Click me to add task!</button>
            <div className='p-5 py-5'>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}

export default Tasks;
