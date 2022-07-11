import { Field, ErrorMessage } from 'formik';

interface Props {
    name: string;
    label: string;
    onChange: (name: string, value: string) => void;
}

export default function FormTextField({ name, label, onChange }: Props) {
    return (
        <div className='mb-2'>
            <label htmlFor={name}>{label}: </label>
            <Field
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                name={name}
                onChange={(event: any) => onChange(name, event.currentTarget.value)}
            />
            <ErrorMessage
                name={name}
                component='div'
                className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
        </div>
    );
}
