import * as Dialog from '@radix-ui/react-dialog';
import React, { useContext } from 'react';
import { AppContext } from '../../pages/_app';
import PomodoroTaskItemForm from '../forms/pomodoroTaskItemForm';
import { Task } from '../pomodoro/tasks';
import DialogHeader from './dialogHeader';

interface Props {
    task: Task;
    enabled: boolean;
    closeDialog: () => void;
    onRename: (task: Task, label: string) => void;
}

export default function PomodoroTaskItemDialog({ task, enabled, closeDialog, onRename }: Props) {
    const context = useContext(AppContext);

    function handleSave(label: string) {
        onRename(task, label);
        closeDialog();
    }

    return (
        <Dialog.Root open={enabled} onOpenChange={closeDialog}>
            <Dialog.Portal container={context.appRef?.current ?? document.body}>
                <Dialog.Overlay className="bg-sandA-9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-amber-2 p-[25px] focus:outline-none">
                    <DialogHeader title='Rename task' text="Change the new of your task item. Click save when you're done." />
                    <PomodoroTaskItemForm taskName={task.label} handleSave={handleSave} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}