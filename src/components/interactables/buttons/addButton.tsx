import { PlusIcon } from '@radix-ui/react-icons';

interface Props {
    onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
    return (
        <button
            className='mr-3 bg-amber-3 hover:bg-amber-4 text-amber-12 font-semibold px-2 border border-amber-7 hover:border-amber-8 rounded shadow inline-flex items-center'
            onClick={onClick}
        >
            <PlusIcon className='h-5 w-5' aria-hidden='true' />
        </button>
    );
}
