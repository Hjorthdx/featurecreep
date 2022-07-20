import { Menu } from '@headlessui/react';

interface Props {
    children: React.ReactNode;
}

export default function DropdownItem({ children }: Props) {
    return (
        <Menu.Item>
            {({ active }: { active: boolean }) => (
                <a
                    href='#'
                    className={(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700') + ' block px-4 py-2 text-sm'}
                >
                    {children}
                </a>
            )}
        </Menu.Item>
    );
}
