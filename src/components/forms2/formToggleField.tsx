import { ErrorMessage } from 'formik';
import Toggle from '../interactables/toggle';

interface Props {
    name: string;
    label: string;
    enabled: boolean;
    onChange: () => void;
}

export default function FormToggleField({ name, label, enabled, onChange }: Props) {
    return (
        <div className='mb-2'>
            <Toggle enabled={enabled} onClick={onChange} label={label} />
            <ErrorMessage
                name={name}
                component='div'
                className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
        </div>
    );
}
