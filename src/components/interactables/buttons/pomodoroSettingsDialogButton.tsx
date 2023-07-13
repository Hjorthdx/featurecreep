import * as Dialog from '@radix-ui/react-dialog';
import { GearIcon } from '@radix-ui/react-icons';
import ElevatedButton from "./elevatedButton";

interface Props {
    enabled: boolean
}

export default function PomodoroSettingsDialogButton({ enabled }: Props) {
    return (
        <Dialog.Trigger asChild>
            <ElevatedButton>
                <GearIcon /> Settings
            </ElevatedButton>
        </Dialog.Trigger>
    )
}