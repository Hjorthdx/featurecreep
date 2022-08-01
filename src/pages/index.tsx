import type { NextPage } from 'next';
import Head from '../components/head';
import { signOut } from 'next-auth/react';
import FeatureGrid from '../components/grids/featureGrid';

const Home: NextPage = () => {
    return (
        <div className='bg-zinc-300'>
            <Head title='FeatureCreep' />
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
