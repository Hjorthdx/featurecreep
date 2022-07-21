import { useState, useEffect } from 'react';

interface Props {
    label: string;
    // Might need parameter
    onClick: (checked: boolean) => void;
    checked?: boolean;
}

export default function Checkbox({ label, onClick, checked = false }: Props) {
    const [isChecked, setIsChecked] = useState(checked);

    function handleClick() {
        setIsChecked(!isChecked);
        onClick(!isChecked);
    }

    useEffect(() => {
        return () => {
            setIsChecked(false);
        };
    }, [label]);

    return (
        <div className='flex items-center'>
            <input
                id='default-checkbox'
                type='checkbox'
                value=''
                className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600'
                checked={isChecked}
                onClick={handleClick}
            />
            <label htmlFor='default-checkbox' className='ml-2 text-gray-800 font-semibold'>
                {label}
            </label>
        </div>
    );
}
