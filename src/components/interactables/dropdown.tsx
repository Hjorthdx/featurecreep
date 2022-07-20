import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface Props {
    dropdownName: string;
    children: React.ReactNode;
}

export default function Dropdown({ dropdownName, children }: Props) {
    return (
        <Menu as='div' className='relative inline-block text-left'>
            <div>
                <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-400 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none'>
                    {dropdownName}
                    <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                {children}
            </Transition>
        </Menu>
    );
}
