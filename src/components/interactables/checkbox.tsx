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
                className='w-5 h-5 text-amber-11 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600'
                checked={isChecked}
                onClick={handleClick}
            />
            <label htmlFor='default-checkbox' className={`${checked ? 'line-through' : ''} ml-2 text-amber-11 font-semibold text-xl'`}>
                {label}
            </label>
        </div>
    );
}
