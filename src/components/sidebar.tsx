import Link from 'next/link';
import SidebarButton from './interactables/buttons/sidebarButton';

interface Props {
    show: boolean;
}

export default function Sidebar({ show }: Props) {
    return (
        <div
            className={`top-0 left-0 w-[25vw] bg-amber-3 pt-10 fixed h-full ease-in-out duration-300 border border-amber-6 ${
                show ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <h2 className='w-full mt-5 text-2xl sm:text-4xl font-semibold text-amber-11 text-center pb-2 border-b-2 border-amber-7'>
                All the features
            </h2>
            <SidebarButton link='/pomodoro' text='Pomodoro' />
            <SidebarButton link='/dune' text='Dune' />
        </div>
    );
}
