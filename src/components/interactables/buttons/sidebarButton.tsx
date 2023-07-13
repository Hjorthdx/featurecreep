import Link from 'next/link';

interface Props {
    link: string;
    text: string;
}

export default function SidebarButton({ link, text }: Props) {
    return (
        <Link href={link}>
            <button className='w-full flex flex-row justify-center items-center p-2 border-b-2 border-amber-7 hover:bg-amber-4 text-amber-12 text-xl'>
                {text}
            </button>
        </Link>
    )
}