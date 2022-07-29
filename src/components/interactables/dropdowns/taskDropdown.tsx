import { Menu } from '@headlessui/react';
import Dropdown from './dropdown';
import DropdownItem from './dropdownItem';
import DropdownTaskButton from '../buttons/dropdownTaskButton';

interface Props {
    onRename: () => void;
    onDelete: () => void;
}

export default function TaskDropdown({ onRename, onDelete }: Props) {
    return (
        <Dropdown menuButton={<DropdownTaskButton />}>
            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                <div className='py-1'>
                    <DropdownItem onClick={onRename}>Rename</DropdownItem>
                    <DropdownItem onClick={onDelete}>Delete</DropdownItem>
                </div>
            </Menu.Items>
        </Dropdown>
    );
}
