import { Menu } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';

export default function DropdownTaskButton() {
    return (
        <Menu.Button className='hover:scale-110'>
            <DotsVerticalIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
        </Menu.Button>
    );
}
