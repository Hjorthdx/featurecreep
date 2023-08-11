import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    path: string;
    title: string;
    children: ReactNode;
}

export default function GridCell({ path, title, children }: Props) {
    return (
        <section className='h-full max-h-72 transform group border-2 border-amber-7 rounded-2xl duration-300 hover:scale-105 hover:border-amber-8 hover:-translate-y-1 hover:shadow-2xl bg-amber-3 hover:bg-amber-4 hover:cursor-pointer'>
            <Link href={path}>
                <div className='p-5 py-10 flex flex-col justify-center h-full text-center'>
                    <h2 className='mb-5 text-3xl text-amber-12 overflow-hidden whitespace-nowrap text-ellipsis'>{title}</h2>
                    {children}
                </div>
            </Link>
        </section>
    );
}
