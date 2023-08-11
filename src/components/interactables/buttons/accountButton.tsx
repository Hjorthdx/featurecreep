import Router from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { LoginIcon, UserCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';

export default function AccountButton() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <button onClick={() => signIn()}>
                <LoginIcon className='h-12 w-12' aria-hidden='true' />
            </button>
        );
    }

    // Should there be an account page? Router.push('/account')
    return (
        <button
            className='mr-2 hover:bg-gray-100 text-gray-800 font-semibold px-2 border-gray-400 rounded inline-flex items-center'
            onClick={() => prompt('Not implemented yet')}
        >
            <p>{session.user.name}</p>
            {session.user.image ? (
                <div className='relative h-10 w-10 ml-2'>
                    <Image
                        className='rounded-full'
                        src={session.user.image}
                        alt='User profile picture'
                        layout='fill'
                        objectFit='contain'
                    />
                </div>
            ) : (
                <UserCircleIcon className='h-12 w-12' aria-hidden='true' />
            )}
        </button>
    );
}
