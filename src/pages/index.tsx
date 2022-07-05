import type { NextPage } from 'next';
import Link from 'next/link';
import { trpc } from '../utils/trpc';
import Head from '../components/head';

import { signIn, signOut, useSession } from 'next-auth/react';
import FeatureGrid from '../components/grid/featureGrid';

const Home: NextPage = () => {
    const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);
    const { mutate } = trpc.useMutation(['example.addExampleTest']);

    const { data: session, status } = useSession();
    const loading = status === 'loading';
    if (loading) return <p>Loading...</p>;
    if (session)
        return (
            <div className='bg-zinc-300'>
                <Head />
                <div className='container flex flex-col items-center justify-center min-h-screen p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0 '>
                    <h1 className='font-extrabold text-center text-7xl'>Welcome!</h1>

                    <h3 className='items-center m-5 text-3xl'>FeatureCreep presents:</h3>

                    <FeatureGrid />
                </div>

                <div className='py-6 text-2xl text-blue-500'>
                    {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
                </div>
                <button
                    onClick={() => {
                        console.log('onClick!');
                        mutate({ text: 'test' });
                    }}
                >
                    CREATE!
                </button>
                <Link href={'/pomodoro'}>Go to pomodoro</Link>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    return (
        <>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
};

export default Home;
