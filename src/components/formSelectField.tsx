import { Field, ErrorMessage } from 'formik';

// havn't figured this one out yet
interface Props {
    name: string;
    label: string;
    onChange: (name: string, event: any) => void;
    children: React.ReactNode;
}

export default function FormSelectField({ name, label, onChange, children }: Props) {
    return (
        <div>
            <label htmlFor={name}>{label}: </label>
            <Field
                className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                as='select'
                name={name}
                onChange={(event: any) => onChange(label, event.target.value)}
            >
                {children}
            </Field>
            <ErrorMessage
                name={name}
                component='div'
                className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
        </div>
    );
}
