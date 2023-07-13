import { GearIcon } from '@radix-ui/react-icons';
import ElevatedButton from "./elevatedButton";

interface Props {
    enabled?: boolean;
    onClick: () => void;
}

export default function SettingsButton({ enabled, onClick }: Props) {
    return (
        <ElevatedButton enabled={enabled} onClick={onClick}>
            <GearIcon /> Settings
        </ElevatedButton>
    );
}
