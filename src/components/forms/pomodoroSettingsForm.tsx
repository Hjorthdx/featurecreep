import * as Form from '@radix-ui/react-form';
import { useSession } from 'next-auth/react';
import { PomodoroFormat } from 'prisma/prisma-client';
import { ChangeEvent, FormEvent } from 'react';
import { DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_LONG_BREAK_TIME } from '../../constants';
import PomodoroInputFormField from './pomodoroInputFormField';
import PomodoroSelectFormField from './pomodoroSelectFormField';

interface Props {
    pomodoroFormats: PomodoroFormat[];
    selectedPomodoroFormat: PomodoroFormat;
    setSelectedPomodoroFormat: (newPomodoroFormat: PomodoroFormat) => void;
    handleSave: (newPomodoroFormat: Omit<Omit<PomodoroFormat, 'id'>, 'userId'>) => void;
}

export default function PomodoroSettingsForm({ pomodoroFormats, selectedPomodoroFormat, setSelectedPomodoroFormat, handleSave }: Props) {
    const { data: session } = useSession();

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

    function onOptionChange(event: ChangeEvent<HTMLSelectElement>) {
        const foundFormat = pomodoroFormats.find((option) => {
            if (option.id === event.currentTarget.value) {
                return option;
            }
        });
        setSelectedPomodoroFormat(
            foundFormat ?? {
                id: 'NEW_POMODORO_FORMAT_ID',
                userId: '-1',
                name: 'New Pomodoro Format',
                workDuration: `${DEFAULT_WORK_TIME}`,
                breakDuration: `${DEFAULT_BREAK_TIME}`,
                longBreakDuration: `${DEFAULT_LONG_BREAK_TIME}`,
                autoStartTimer: false,
            }
        );
    }

    return (
        <Form.Root onSubmit={handleSubmit} className="w-full">
            <PomodoroSelectFormField selectedPomodoroFormatId={session?.user.selectedPomodoroFormatId ?? ''} pomodoroFormats={pomodoroFormats} onOptionChange={onOptionChange} />

            <PomodoroInputFormField name='formatName' label='Format name' valueMissing='Please enter a format name' placeholder={selectedPomodoroFormat.name} />
            <PomodoroInputFormField name='workDuration' label='Work duration (minutes)' valueMissing='Please enter a work duration' type='number' placeholder={selectedPomodoroFormat.workDuration} />
            <PomodoroInputFormField name='breakDuration' label='Break duration (minutes)' valueMissing='Please enter a break duration' type='number' placeholder={selectedPomodoroFormat.breakDuration} />
            <PomodoroInputFormField name='longBreakDuration' label='Long break duration (minutes)' valueMissing='Please enter a long break duration' type='number' placeholder={selectedPomodoroFormat.longBreakDuration} />

            <Form.Submit asChild>
                <button className="box-border w-full text-amber-11 shadow-amber-7 hover:bg-amber-4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-amber-3 px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-amber-8 hover:shadow-amber-8 focus:outline-none mt-[10px]">
                    Save
                </button>
            </Form.Submit>
        </Form.Root>
    );
}