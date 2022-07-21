import { Menu } from '@headlessui/react';
import Dropdown from './dropdown';
import DropdownItem from './dropdownItem';
import DropdownTaskButton from '../buttons/dropdownTaskButton';

export default function TaskDropdown() {
    return (
        <Dropdown menuButton={<DropdownTaskButton />}>
            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                <div className='py-1'>
                    <DropdownItem onClick={() => {}}>Rename</DropdownItem>
                    <DropdownItem onClick={() => {}}>Delete</DropdownItem>
                </div>
            </Menu.Items>
        </Dropdown>
    );
}
