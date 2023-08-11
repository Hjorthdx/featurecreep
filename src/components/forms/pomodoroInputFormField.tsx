import * as Form from '@radix-ui/react-form';
import { ChangeEvent, useEffect, useState } from 'react';

interface Props {
    name: string;
    label: string;
    valueMissing: string;
    type?: string;
    placeholder: string;
}

export default function PomodoroInputFormField({ name, label, valueMissing, type, placeholder }: Props) {
    const [value, setValue] = useState(placeholder);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);
    }

    // TODO: Can I avoid having to do this?
    // Currently needed to update the values, when a new option is selected in the Pomodoro formats dropdown...
    useEffect(() => {
        setValue(placeholder)
    }, [placeholder]);

    return <Form.Field className="grid mb-[10px]" name={name}>
        <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-amber-12 data-invalid:border-greenA-12 formLabel">
                {label}
            </Form.Label>
            <Form.Message className="text-[13px] text-amber-12 opacity-[0.8]" match="valueMissing">
                {valueMissing}
            </Form.Message>
        </div>
        <Form.Control asChild>
            <input
                className="box-border w-full bg-amber-3 shadow-amberA-6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-amber-12 shadow-[0_0_0_1px] outline-none hover:shadow-amber-7 focus:shadow-amber-8 selection:color-white selection:bg-amberA-9 resize-none formControl placeholder-amber-11" type={type} required placeholder={placeholder} value={value} onChange={onChange}
            />
        </Form.Control>
    </Form.Field>
}