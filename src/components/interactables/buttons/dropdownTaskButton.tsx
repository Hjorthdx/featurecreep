import { Menu } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';

export default function DropdownTaskButton() {
    return (
        <Menu.Button className='hover:scale-110'>
            <DotsVerticalIcon className='pt-2 h-7 w-7' aria-hidden='true' />
        </Menu.Button>
    );
}
