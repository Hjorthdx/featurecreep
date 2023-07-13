import * as Dialog from '@radix-ui/react-dialog';
import { GearIcon } from '@radix-ui/react-icons';
import ElevatedButton from "./elevatedButton";

interface Props {
    enabled: boolean;
    onClick: () => void;
}

export default function PomodoroSettingsDialogButton({ enabled, onClick }: Props) {
    return (
        <Dialog.Trigger asChild>
            <ElevatedButton enabled={enabled} onClick={onClick}>
                <GearIcon /> Settings
            </ElevatedButton>
        </Dialog.Trigger>
    )
}