import { Menu } from '@headlessui/react';

interface Props {
    onClick: () => void;
    children: React.ReactNode;
}

export default function DropdownItem({ onClick, children }: Props) {
    return (
        <Menu.Item>
            {({ active }: { active: boolean }) => (
                <a
                    className={(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700') + ' block px-4 py-2 text-sm'}
                    onClick={onClick}
                >
                    {children}
                </a>
            )}
        </Menu.Item>
    );
}
