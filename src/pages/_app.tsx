// src/pages/_app.tsx
import type { AppType } from 'next/dist/shared/lib/utils';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '../utils/themeProvider';
import '../styles/globals.css';
import React, { createContext, useRef } from 'react';
import { trpc } from '../utils/trpc';
import type { AppProps } from 'next/app';

interface AppContextType {
    appRef: React.RefObject<HTMLDivElement> | null;
}

export const AppContext = createContext<AppContextType>({
    appRef: null,
});

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const appRef = useRef<HTMLDivElement>(null);
    return (
        <SessionProvider session={session}>
            <ThemeProvider>
                <div ref={appRef}>
                    <AppContext.Provider value={{ appRef }}>
                        <Component {...pageProps} />
                    </AppContext.Provider>
                </div>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default trpc.withTRPC(MyApp);
