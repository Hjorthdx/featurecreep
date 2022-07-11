import type { NextPage } from 'next';
import Link from 'next/link';
import { trpc } from '../utils/trpc';
import Head from '../components/head';

import { signIn, signOut, useSession } from 'next-auth/react';
import FeatureGrid from '../components/grids/featureGrid';

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    if (loading) return <p>Loading...</p>;
    if (!session) {
        return (
            <>
                <button onClick={() => signIn()}>Sign in</button>
            </>
        );
    }
    return (
        <div className='bg-zinc-300'>
            <Head />
            <div className='container flex flex-col items-center justify-center min-h-screen p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0'>
                <h1 className='font-extrabold text-center text-7xl'>Welcome!</h1>

                <h3 className='items-center m-5 text-3xl'>FeatureCreep presents:</h3>

                <FeatureGrid />
            </div>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export default Home;
