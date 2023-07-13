import * as Form from '@radix-ui/react-form';

interface Props {
    name: string;
    label: string;
    valueMissing: string;
    type?: string;
}

export default function PomodoroFormField({ name, label, valueMissing, type }: Props) {
    return <Form.Field className="grid mb-[10px]" name={name}>
        <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-amber-12 data-invalid:border-greenA-12 data-[invalid]:text-red-12">
                {label}
            </Form.Label>
            <Form.Message className="text-[13px] text-amber-12 opacity-[0.8]" match="valueMissing">
                {valueMissing}
            </Form.Message>
        </div>
        <Form.Control asChild>
            <input
                className="box-border w-full bg-amber-3 shadow-amberA-6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-amber-12 shadow-[0_0_0_1px] outline-none hover:shadow-amber-7 focus:shadow-amber-8 selection:color-white selection:bg-amberA-9 resize-none formControl"
                type={type}
                required
            />
        </Form.Control>
    </Form.Field>
}