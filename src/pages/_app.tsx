// src/pages/_app.tsx
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '../server/router';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import { SessionProvider } from 'next-auth/react';
import { SECONDS_IN_A_DAY } from '../constants';
import { ThemeProvider } from '../utils/themeProvider';
import '../styles/globals.css';
import React, { createContext, useRef } from 'react';

interface AppContextType {
    appRef: React.RefObject<HTMLDivElement> | null;
}

export const AppContext = createContext<AppContextType>({
    appRef: null
});


const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
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
        </SessionProvider >
    );
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        if (typeof window !== 'undefined') {
            // during client requests
            return {
                transformer: superjson, // optional - adds superjson serialization
                url: '/api/trpc',
            };
        }
        // during SSR below

        // optional: use SSG-caching for each rendered page (see caching section for more details)
        ctx?.res?.setHeader('Cache-Control', `s-maxage=1, stale-while-revalidate=${SECONDS_IN_A_DAY}`);

        // The server needs to know your app's full url
        // On render.com you can use `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/api/trpc`
        const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/trpc` : 'http://localhost:3000/api/trpc';

        return {
            transformer: superjson, // optional - adds superjson serialization
            url,
            headers: {
                // optional - inform server that it's an ssr request
                'x-ssr': '1',
            },
        };
    },
    ssr: true,
})(MyApp);

/*
const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return '';
    }
    if (process.browser) return ''; // Browser should use current path
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        //
        // If you want to use SSR, you need to use the server's full URL
        // @link https://trpc.io/docs/ssr
        //
         const url = `${getBaseUrl()}/api/trpc`;

         return {
             url,
             transformer: superjson,
             //
             // @link https://react-query.tanstack.com/reference/QueryClient
             //
             // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
         };
     },
    //
    // @link https://trpc.io/docs/ssr
    //
     ssr: false,
 })(MyApp);
*/
