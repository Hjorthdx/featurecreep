import Image from 'next/image';

interface Props {
    onClick: () => void;
}

export default function LogoButton({ onClick }: Props) {
    return (
        <button
            className='m-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow inline-flex items-center'
            onClick={onClick}
        >
            <Image src='/logo.png' alt='logo icon' height={32} width={128} />
        </button>
    );
}
