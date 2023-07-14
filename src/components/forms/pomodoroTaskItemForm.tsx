import * as Form from '@radix-ui/react-form';
import { useSession } from 'next-auth/react';
import { PomodoroFormat } from 'prisma/prisma-client';
import { ChangeEvent, FormEvent } from 'react';
import { DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_LONG_BREAK_TIME } from '../../constants';
import { Task } from '../pomodoro/tasks';
import PomodoroInputFormField from './pomodoroInputFormField';
import PomodoroSelectFormField from './pomodoroSelectFormField';

interface Props {
    taskName: string;
    handleSave: (label: string) => void;
}

export default function PomodoroTaskItemForm({ taskName, handleSave }: Props) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        handleSave(event.currentTarget.label.value);
    }

    return (
        <Form.Root onSubmit={handleSubmit} className="w-full">
            <PomodoroInputFormField name='label' label='Task name' valueMissing='Please enter a name' placeholder={taskName} />
            <Form.Submit asChild>
                <button className="box-border w-full text-amber-11 shadow-amber-7 hover:bg-amber-4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-amber-3 px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-amber-8 hover:shadow-amber-8 focus:outline-none mt-[10px]">
                    Save
                </button>
            </Form.Submit>
        </Form.Root>
    );
}