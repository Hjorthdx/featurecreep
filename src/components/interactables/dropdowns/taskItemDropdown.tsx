import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    DotsVerticalIcon
} from '@radix-ui/react-icons';

interface Props {
    onRename: () => void;
    onDelete: () => void;
}

export default function TaskItemDropdown({ onRename, onDelete }: Props) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className="rounded-md inline-flex items-center justify-center px-2 shadow outline-none text-amber-12 bg-amber-3 hover:bg-amber-4 border border-amber-7 hover:border-amber-8"
                    aria-label="Customise options"
                >
                    <DotsVerticalIcon />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-max bg-amber-3 rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                >
                    <DropdownMenu.Item className="group text-[13px] leading-none text-amber-12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-sand-8 data-[disabled]:pointer-events-none data-[highlighted]:bg-amber-4 data-[highlighted]:text-amber-12 hover:bg-amber-4 cursor-pointer" onSelect={onRename}>
                        Rename
                        <div className="ml-auto pl-[20px] text-amber-12 group-data-[highlighted]:text-amber group-data-[disabled]:text-sand-8">
                            CTRL+D
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="h-[1px] bg-sand-6 m-[5px]" />
                    <DropdownMenu.Item className="group text-[13px] leading-none text-amber-12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-sand-8 data-[disabled]:pointer-events-none data-[highlighted]:bg-amber-4 data-[highlighted]:text-amber-12 hover:bg-amber-4 cursor-pointer" onSelect={onDelete}>
                        Delete
                        <div className="ml-auto pl-[20px] text-amber-12 group-data-[highlighted]:text-amber group-data-[disabled]:text-sand-8">
                            CTRL+SHIFT+D
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}