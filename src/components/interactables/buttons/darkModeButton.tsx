import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

interface Props {
    darkMode: boolean;
    onClick: () => void;
}

export default function DarkModeButton({ darkMode, onClick }: Props) {
    return (
        <button
            className='m-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow inline-flex items-center'
            onClick={onClick}
        >
            {darkMode && <SunIcon />}
            {!darkMode && <MoonIcon />}
        </button>
    );
}