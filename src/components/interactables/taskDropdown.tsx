import { Menu } from '@headlessui/react';
import Dropdown from './dropdown';
import DropdownItem from './dropdownItem';

export default function TaskDropdown() {
    return (
        <Dropdown dropdownName='Options'>
            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                <div className='py-1'>
                    <DropdownItem>Delete completed tasks</DropdownItem>
                </div>
                <div className='py-1'>
                    <DropdownItem>Delete all tasks</DropdownItem>
                </div>
            </Menu.Items>
        </Dropdown>
    );
}
