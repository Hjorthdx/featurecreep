import { useState, useEffect, useRef, ChangeEvent } from 'react';
// Perhabs group hooks together to get something like this?
// import { useCreateTask, useGetTasks } from '../../hooks/pomodoro';
import TaskItem from './taskItem';
import useLocalStorage from '../../hooks/useLocalStorage';

export interface Task {
    id: string;
    label: string;
    checked: boolean;
}

function Tasks() {
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
        if (inputRef.current?.value.length)
            if (inputRef.current?.value.length <= 1) {
                return;
            }

        setTasks((tasks) => [
            ...tasks,
            {
                id: inputRef.current?.value + new Date().toLocaleDateString() ?? '' + new Date().toLocaleDateString(),
                label: inputRef.current?.value ?? '',
                checked: false,
            },
        ]);
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

    return (
        <div className='flex flex-col items-center bg-white rounded-2xl border-2 border-neutral-800'>
            <label>Tasks</label>
            <input ref={inputRef} type='text' onChange={onChange} placeholder='Please insert task name' />
            <button onClick={handleNewTaskClick}>Click me to add task!</button>
            <div className='p-5 py-5'>
                {tasks.map((task, index) => (
                    <TaskItem key={index} task={task} onClick={onTaskClick} />
                ))}
            </div>
        </div>
    );
}

export default Tasks;
