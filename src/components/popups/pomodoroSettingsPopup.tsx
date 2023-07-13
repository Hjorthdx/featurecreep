import { useSession } from 'next-auth/react';
import Popup from './popup';
import PopupFooter from './popupFooter';
import PopupHeader from './popupHeader';
import useCreatePomodoroFormat from '../../hooks/pomodoro/format/useCreatePomodoroFormat';
import useGetAllOfUsersPomodoroFormats from '../../hooks/pomodoro/format/useGetUsersPomodoroFormats';
import useSelectedPomodoroFormat from '../../hooks/pomodoro/format/useSelectedPomodoroFormat';
import useUpdatePomodoroFormat from '../../hooks/pomodoro/format/useUpdatePomodoroFormat';
import useUpdateUsersSelectedPomodoroFormat from '../../hooks/pomodoro/format/useUpdateUsersSelectedPomodoroFormat';
import PomodoroSettingsForm from '../forms2/pomodoroSettingsForm';

interface Props {
    show: boolean;
    handleClose: () => void;
}

export default function PomodoroSettingsPopup({ show, handleClose }: Props) {
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

    function handleSave() {
        if (session?.user) {
            if (selectedPomodoroFormat.id === 'NEW_POMODORO_FORMAT_ID') {
                create(
                    {
                        name: selectedPomodoroFormat.name,
                        workDuration: selectedPomodoroFormat.workDuration,
                        breakDuration: selectedPomodoroFormat.breakDuration,
                        longBreakDuration: selectedPomodoroFormat.longBreakDuration,
                        autoStartTimer: selectedPomodoroFormat.autoStartTimer,
                    },
                    {
                        onSuccess: (data) => {
                            updateUsersSelectedPomodoroFormat({ pomodoroFormatId: data.id });
                            session.user.selectedPomodoroFormatId = data.id;
                        },
                    }
                );
            } else {
                update(selectedPomodoroFormat, {
                    onSuccess: (data) => {
                        updateUsersSelectedPomodoroFormat({ pomodoroFormatId: data.id });
                        session.user.selectedPomodoroFormatId = data.id;
                    },
                });
            }
        }
        handleClose();
    }

    return (
        <Popup show={show}>
            <PopupHeader title='Pomodoro settings' handleClose={handleClose} />
            <div className='relative px-5 py-4 flex-auto'>
                <PomodoroSettingsForm
                    pomodoroFormats={formats ?? []}
                    selectedPomodoroFormat={selectedPomodoroFormat}
                    setSelectedPomodoroFormat={setSelectedPomodoroFormat}
                    onSubmit={handleSave}
                />
            </div>
            <PopupFooter handleClose={handleClose} handleSave={handleSave} />
        </Popup>
    );
}
