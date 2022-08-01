import Router from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { LoginIcon, UserCircleIcon } from '@heroicons/react/solid';

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
            <UserCircleIcon className='h-12 w-12' aria-hidden='true' />
        </button>
    );
}
