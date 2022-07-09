import { Formik, Form, Field, ErrorMessage } from 'formik';
import Popup from './popup';
import PopupFooter from './popupFooter';
import PopupHeader from './popupHeader';
import { trpc } from '../../utils/trpc';
import { useSession } from 'next-auth/react';
import { PomodoroFormat } from '@prisma/client';
import { useState } from 'react';
import FormTextField from '../formTextField';
import FormSelectField from '../formSelectField';

interface Props {
    show: boolean;
    handleClose: () => void;
}

export default function PomodoroSettingsPopup({ show, handleClose }: Props) {
    const [initialValues, setinitialValues] = useState({
        formatName: 'Default name',
        workDuration: '25',
        breakDuration: '5',
        longBreakDuration: '15',
    });

    const { mutate } = trpc.useMutation('pomodoro.createPomodoroFormat');
    const { data: session } = useSession();
    const { data: options } = trpc.useQuery([
        'pomodoro.getPomodoroOptionsFromUser',
        {
            userId: session?.user?.id ?? '',
        },
    ]);

    function handleSave() {
        console.log('handleSave');
    }

    function onChange(name: string, value: any) {
        setinitialValues({ ...initialValues, [name]: value });
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
                    initialValues={initialValues}
                    valudationSchema={validationSchema}
                    onSubmit={() =>
                        mutate({
                            name: initialValues.formatName,
                            workDuration: parseInt(initialValues.workDuration),
                            breakDuration: parseInt(initialValues.breakDuration),
                            longBreakDuration: parseInt(initialValues.longBreakDuration),
                        })
                    }
                >
                    <Form>
                        <FormSelectField name='savedPomodoroFormats' label='Pre-saved formats' onChange={onChange}>
                            {options &&
                                options.map((option: PomodoroFormat, index) => {
                                    return (
                                        <option key={index} value={option.id}>
                                            {option.name}
                                        </option>
                                    );
                                })}
                        </FormSelectField>
                        <FormTextField name='formatName' label='New format name' onChange={onChange} />
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
