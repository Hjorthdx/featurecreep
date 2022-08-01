import Router from 'next/router';
import Hamburger from 'hamburger-react';
import LogoButton from './interactables/buttons/logoButton';
import AccountButton from './interactables/buttons/accountButton';
import { useState } from 'react';
import Sidebar from './sidebar';

export default function Navbar() {
    const [show, setShow] = useState(false);

    return (
        <div className='flex flex-row ml-2 justify-between sticky top-0 z-50'>
            <Sidebar show={show} />
            <div className='flex flex-row space-x-2 z-10'>
                <Hamburger size={32} onToggle={(toggled) => setShow(toggled)} />
                <LogoButton onClick={() => Router.push('/')} />
            </div>
            <AccountButton />
        </div>
    );
}
