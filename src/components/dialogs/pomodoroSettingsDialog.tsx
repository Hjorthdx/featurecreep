import { useContext } from 'react';
import { PomodoroFormat } from '.prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { useSession } from 'next-auth/react';
import useCreatePomodoroFormat from '../../hooks/pomodoro/format/useCreatePomodoroFormat';
import useGetAllOfUsersPomodoroFormats from '../../hooks/pomodoro/format/useGetUsersPomodoroFormats';
import useSelectedPomodoroFormat from '../../hooks/pomodoro/format/useSelectedPomodoroFormat';
import useUpdatePomodoroFormat from '../../hooks/pomodoro/format/useUpdatePomodoroFormat';
import useUpdateUsersSelectedPomodoroFormat from '../../hooks/pomodoro/format/useUpdateUsersSelectedPomodoroFormat';
import PomodoroSettingsForm from '../forms/pomodoroSettingsForm';
import DialogHeader from './dialogHeader';
import { AppContext } from '../../pages/_app';

interface Props {
    enabled: boolean;
    closeDialog: () => void;
}

export default function PomodoroSettingsDialog({ enabled, closeDialog }: Props) {
    const context = useContext(AppContext);
    const { create } = useCreatePomodoroFormat();
    const { update } = useUpdatePomodoroFormat();
    const { updateUsersSelectedPomodoroFormat } = useUpdateUsersSelectedPomodoroFormat();
    const { data: session } = useSession();
    const { formats } = useGetAllOfUsersPomodoroFormats({
        userId: session?.user.id ?? '',
    });
    const { selectedPomodoroFormat, setSelectedPomodoroFormat } = useSelectedPomodoroFormat({
        formats: formats,
        selectedId: session?.user?.selectedPomodoroFormatId ?? '',
    });

    function handleSave(newPomodoroFormat: Omit<Omit<PomodoroFormat, 'id'>, 'userId'>) {
        if (session?.user) {
            if (selectedPomodoroFormat.id === 'NEW_POMODORO_FORMAT_ID') {
                create(newPomodoroFormat,
                    {
                        onSuccess: (data) => {
                            updateUsersSelectedPomodoroFormat({ pomodoroFormatId: data.id });
                            session.user.selectedPomodoroFormatId = data.id;
                        },
                    }
                );
            } else {
                update({ ...newPomodoroFormat, id: selectedPomodoroFormat.id }, {
                    onSuccess: (data) => {
                        updateUsersSelectedPomodoroFormat({ pomodoroFormatId: data.id });
                        session.user.selectedPomodoroFormatId = data.id;
                    },
                });
            }
        }
        closeDialog();
    }

    return (
        <Dialog.Root open={enabled} onOpenChange={closeDialog}>
            <Dialog.Portal container={context.appRef?.current ?? document.body}>
                <Dialog.Overlay className="bg-sandA-9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-amber-2 p-[25px] focus:outline-none">
                    <DialogHeader title='Pomodoro settings' text="Make changes to your pomodoro format here or create a completely new one. Click save when you're done." />
                    <PomodoroSettingsForm pomodoroFormats={formats ?? []}
                        selectedPomodoroFormat={selectedPomodoroFormat}
                        setSelectedPomodoroFormat={setSelectedPomodoroFormat} handleSave={handleSave} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}