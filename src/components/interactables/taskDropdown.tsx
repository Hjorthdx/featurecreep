import { Menu } from '@headlessui/react';
import { Task } from '../pomodoro/tasks';
import Dropdown from './dropdown';
import DropdownItem from './dropdownItem';

interface Props {
    onTaskDelete: (filter?: (task: Task) => boolean) => void;
}

export default function TaskDropdown({ onTaskDelete }: Props) {
    function handleDeleteAll() {
        if (confirm('Are you sure you want to delete all tasks?')) {
            onTaskDelete();
        }
    }
    return (
        <Dropdown dropdownName='Options'>
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
