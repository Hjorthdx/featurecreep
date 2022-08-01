import Link from 'next/link';

interface Props {
    show: boolean;
}

export default function Sidebar({ show }: Props) {
    return (
        <div
            className={`top-0 left-0 w-[25vw] bg-white pt-10 text-white fixed h-full ease-in-out duration-300 ${
                show ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <h2 className='w-full mt-5 text-4xl font-semibold text-black text-center pb-2 border-b-2 border-gray-300'>
                All the features
            </h2>
            <Link href='/pomodoro'>
                <button className='w-full flex flex-row justify-center items-center p-2 border-b-2 border-gray-300 hover:bg-gray-100 text-black'>
                    Pomodoro
                </button>
            </Link>
            <Link href='/account'>
                <button className='w-full flex flex-row justify-center items-center p-2 border-b-2 border-gray-300 hover:bg-gray-100 text-black'>
                    Account
                </button>
            </Link>
        </div>
    );
}
