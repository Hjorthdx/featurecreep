import { Menu } from '@headlessui/react';
import { Task } from '../../pomodoro/tasks';
import Dropdown from './dropdown';
import DropdownItem from './dropdownItem';
import DropdownOptionsButton from '../buttons/dropdownOptionsButton';

interface Props {
    onTaskDelete: (filter?: (task: Task) => boolean) => void;
}

export default function TaskOptionsDropdown({ onTaskDelete }: Props) {
    function handleDeleteAll() {
        // Should this know if there are any tasks ?
        // No need to ask for confirmation if there are no tasks ?
        if (confirm('Are you sure you want to delete all tasks?')) {
            onTaskDelete();
        }
    }
    return (
        <Dropdown menuButton={<DropdownOptionsButton />}>
            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                <div className='py-1'>
                    <DropdownItem onClick={() => onTaskDelete((task) => task.checked === false)}>
                        Delete completed tasks
                    </DropdownItem>
                </div>
                <div className='py-1'>
                    <DropdownItem onClick={handleDeleteAll}>Delete all tasks</DropdownItem>
                </div>
            </Menu.Items>
        </Dropdown>
    );
}