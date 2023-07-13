import Image from 'next/image';
import settingIcon from '../../../assets/settings-icon.png';

interface Props {
    enabled?: boolean;
    onClick: () => void;
}

export default function SettingsButton({ enabled, onClick }: Props) {
    return (
        <button
            className={`m-2 ${enabled ? 'bg-amber-5 border-amber-8' : 'bg-amber-3 hover:bg-amber-4'
                } text-amber-12 font-semibold px-2 border border-amber-7 hover:border-amber-8 rounded shadow inline-flex items-center`}
            onClick={onClick}
        >
            <Image src={settingIcon} alt='settings icon' height={40} width={40}></Image> Settings
        </button>
    );
}
