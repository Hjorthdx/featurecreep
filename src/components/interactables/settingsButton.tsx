import Image from 'next/image';
import settingIcon from '../../assets/settings-icon.png';

interface Props {
    onClick: () => void;
}

export default function SettingsButton({ onClick }: Props) {
    return (
        <button
            className='m-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow inline-flex items-center'
            onClick={onClick}
        >
            <Image src={settingIcon} alt='settings icon' height={40} width={40}></Image> Settings
        </button>
    );
}
