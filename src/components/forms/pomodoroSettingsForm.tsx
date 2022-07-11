import { Formik, Form } from 'formik';
import { useSession } from 'next-auth/react';
import { PomodoroFormat } from 'prisma/prisma-client';
import FormSelectField from './formSelectField';
import FormTextField from './formTextField';
import FormToggleField from './formToggleField';

interface Props {
    pomodoroFormats: PomodoroFormat[];
    selectedPomodoroFormat: PomodoroFormat;
    setSelectedPomodoroFormat: (newPomodoroFormat: PomodoroFormat) => void;
    onSubmit: () => void;
}

export default function PomodoroSettingsForm({
    pomodoroFormats,
    selectedPomodoroFormat,
    setSelectedPomodoroFormat,
    onSubmit,
}: Props) {
    const { data: session } = useSession();

    // TODO: Figure out how to use zod to validate the user input
    function validationSchema() {
        return true;
    }

    function onOptionChange(label: string, id: string) {
        const foundFormat = pomodoroFormats?.find((option) => {
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
                autoStartTimer: false,
            }
        );
    }

    function onChange(name: string, value: any) {
        setSelectedPomodoroFormat({ ...selectedPomodoroFormat, [name]: value });
    }

    function onToggleClick() {
        setSelectedPomodoroFormat({ ...selectedPomodoroFormat, autoStartTimer: !selectedPomodoroFormat.autoStartTimer });
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={selectedPomodoroFormat}
            valudationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <FormSelectField name='savedPomodoroFormats' label='Pre-saved formats' onChange={onOptionChange}>
                    {pomodoroFormats &&
                        pomodoroFormats.map((option: PomodoroFormat, index) => {
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
                <FormToggleField
                    name='autoStartTimer'
                    label='Auto start next timer'
                    enabled={selectedPomodoroFormat.autoStartTimer}
                    onChange={onToggleClick}
                />
            </Form>
        </Formik>
    );
}
