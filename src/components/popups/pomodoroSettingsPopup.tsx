import { Formik, Form } from 'formik';
import Popup from './popup';
import PopupFooter from './popupFooter';
import PopupHeader from './popupHeader';
import { useSession } from 'next-auth/react';
import { PomodoroFormat } from '@prisma/client';
import FormTextField from '../formTextField';
import FormSelectField from '../formSelectField';
import useCreatePomodoroFormat from '../../hooks/useCreatePomodoroFormat';
import useGetUsersPomodoroFormats from '../../hooks/useGetUsersPomodoroFormats';
import useSelectedPomodoroFormat from '../../hooks/useSelectedPomodoroFormat';
import useUpdatePomodoroFormat from '../../hooks/useUpdatePomodoroFormat';

interface Props {
    show: boolean;
    handleClose: () => void;
}

export default function PomodoroSettingsPopup({ show, handleClose }: Props) {
    const { create } = useCreatePomodoroFormat();
    const { update } = useUpdatePomodoroFormat();
    const { data: session } = useSession();
    const { formats } = useGetUsersPomodoroFormats({
        userId: session?.user?.id ?? '',
    });
    const { selectedPomodoroFormat, setSelectedPomodoroFormat } = useSelectedPomodoroFormat({
        formats: formats ?? [],
        selectedId: session?.user?.selectedPomodoroFormatId ?? '',
    });

    function handleSave() {
        // Checking against the id being -1 means that it is a new format
        // Cannot get -1 from db, so it has to be the one we made.
        if (selectedPomodoroFormat.id === '-1') {
            create({
                name: selectedPomodoroFormat.name,
                workDuration: selectedPomodoroFormat.workDuration,
                breakDuration: selectedPomodoroFormat.breakDuration,
                longBreakDuration: selectedPomodoroFormat.longBreakDuration,
            });
        } else {
            update(selectedPomodoroFormat);
        }
        handleClose();
    }

    function onOptionChange(label: string, id: string) {
        const foundFormat = formats?.find((option) => {
            if (option.id === id) {
                return option;
            }
        });

        setSelectedPomodoroFormat(
            foundFormat ?? {
                id: '-1',
                userId: '-1',
                name: 'New Pomodoro Format',
                workDuration: '25',
                breakDuration: '5',
                longBreakDuration: '15',
            }
        );
    }

    function onChange(name: string, value: any) {
        setSelectedPomodoroFormat({ ...selectedPomodoroFormat, [name]: value });
    }

    function validationSchema() {
        return true;
    }

    return (
        <Popup show={show}>
            <PopupHeader title='Pomodoro settings' handleClose={handleClose} />
            <div className='relative p-6 flex-auto'>
                <Formik
                    enableReinitialize={true}
                    initialValues={selectedPomodoroFormat}
                    valudationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    <Form>
                        <FormSelectField name='savedPomodoroFormats' label='Pre-saved formats' onChange={onOptionChange}>
                            {formats &&
                                formats.map((option: PomodoroFormat, index) => {
                                    if (option.id === session?.user?.selectedPomodoroFormatId) {
                                        return (
                                            <option key={index} value={option.id} selected>
                                                {option.name}
                                            </option>
                                        );
                                    } else {
                                        return (
                                            <option key={index} value={option.id}>
                                                {option.name}
                                            </option>
                                        );
                                    }
                                })}
                            <option key='newPomodoroFormat' value='new'>
                                New Pomodoro Format
                            </option>
                        </FormSelectField>
                        <FormTextField name='name' label='Format name' onChange={onChange} />
                        <FormTextField name='workDuration' label='Work duration' onChange={onChange} />
                        <FormTextField name='breakDuration' label='Break duration' onChange={onChange} />
                        <FormTextField name='longBreakDuration' label='Long break duration' onChange={onChange} />
                    </Form>
                </Formik>
            </div>
            <PopupFooter handleClose={handleClose} handleSave={handleSave} />
        </Popup>
    );
}
