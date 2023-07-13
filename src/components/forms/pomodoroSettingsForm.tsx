import * as Form from '@radix-ui/react-form';
import { PomodoroFormat } from 'prisma/prisma-client';
import { FormEvent } from 'react';
import PomodoroFormField from './pomodoroFormField';

interface Props {
    handleSave: (newPomodoroFormat: Omit<Omit<PomodoroFormat, 'id'>, 'userId'>) => void;
}

export default function PomodoroSettingsForm({ handleSave }: Props) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data: Omit<Omit<PomodoroFormat, 'id'>, 'userId'> = {
            // How do I get these better typed?
            name: event.currentTarget.formatName.value,
            workDuration: event.currentTarget.workDuration.value,
            breakDuration: event.currentTarget.breakDuration.value,
            longBreakDuration: event.currentTarget.longBreakDuration.value,
            autoStartTimer: false // event.currentTarget.autoStartTimer,
        }
        console.log('Data: ', data);
        handleSave(data);
    }

    return (
        <Form.Root onSubmit={handleSubmit} className="w-full">
            <PomodoroFormField name='formatName' label='Format name' valueMissing='Please ente a format name' />
            <PomodoroFormField name='workDuration' label='Work duration (minutes)' valueMissing='Please enter a work duration' type='number' />
            <PomodoroFormField name='breakDuration' label='Break duration (minutes)' valueMissing='Please enter a break duration' type='number' />
            <PomodoroFormField name='longBreakDuration' label='Long break duration (minutes)' valueMissing='Please enter a long break duration' type='number' />
            <Form.Submit asChild>
                <button className="box-border w-full text-amber-11 shadow-amber-7 hover:bg-amber-4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-amber-3 px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-amber-8 hover:shadow-amber-8 focus:outline-none mt-[10px]">
                    Save
                </button>
            </Form.Submit>
        </Form.Root>
    );
}