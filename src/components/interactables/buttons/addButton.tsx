import { PlusIcon } from '@heroicons/react/solid';

interface Props {
    onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
    return (
        <button
            className='mr-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow inline-flex items-center'
            onClick={onClick}
        >
            <PlusIcon className='h-5 w-5' aria-hidden='true' />
        </button>
    );
}
