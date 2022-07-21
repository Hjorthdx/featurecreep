import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

interface Props {
    menuButton: React.ReactNode;
    children: React.ReactNode;
}

export default function Dropdown({ menuButton, children }: Props) {
    return (
        <Menu as='div' className='relative inline-block text-left'>
            <div>{menuButton}</div>

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
