import { Formik, Form } from 'formik';
import Popup from './popup';
import PopupFooter from './popupFooter';
import PopupHeader from './popupHeader';
import { trpc } from '../../utils/trpc';
import { useSession } from 'next-auth/react';
import { PomodoroFormat } from '@prisma/client';
import { useEffect, useState } from 'react';
import FormTextField from '../formTextField';
import FormSelectField from '../formSelectField';
import useCreatePomodoroFormat from '../../hooks/useCreatePomodoroFormat';
import useGetUsersPomodoroFormats from '../../hooks/useGetUsersPomodoroFormats';
import useSelectedPomodoroFormat from '../../hooks/useSelectedPomodoroFormat';

interface Props {
    show: boolean;
    handleClose: () => void;
}

export default function PomodoroSettingsPopup({ show, handleClose }: Props) {
    const { create } = useCreatePomodoroFormat();
    const { data: session } = useSession();
    const { formats } = useGetUsersPomodoroFormats({
        userId: session?.user?.id ?? '',
    });
    const { selectedPomodoroFormat, setSelectedPomodoroFormat } = useSelectedPomodoroFormat({
        formats: formats ?? [],
        selectedId: session?.user?.selectedPomodoroFormatId ?? '',
    });

    function handleSave() {
        console.log('handleSave');

        // if new mutate (POST)
        // if existing mutate (PUT)
        create({
            name: selectedPomodoroFormat.name,
            workDuration: selectedPomodoroFormat.workDuration,
            breakDuration: selectedPomodoroFormat.breakDuration,
            longBreakDuration: selectedPomodoroFormat.longBreakDuration,
        });
        handleClose();
    }

    function onOptionChange(label: string, id: string) {
        const foundFormat = formats?.find((option) => {
            console.log('option', option);
            if (option.id === id) {
                return option;
            }
        });
        // Have to check for null because find can return undefined, even though it will never happen here
        // Because we are searching through the dropdown options that we have created.
        setSelectedPomodoroFormat(
            foundFormat ?? {
                name: 'New Pomodoro Format',
                workDuration: 25,
                breakDuration: 5,
                longBreakDuration: 15,
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
