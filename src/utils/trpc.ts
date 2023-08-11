import type { AppRouter } from "../server/router";
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import superjson from 'superjson';
import { SECONDS_IN_A_DAY } from '../constants';

function getBaseUrl() {
    if (typeof window !== 'undefined')
        // browser should use relative path
        return '';
    if (process.env.VERCEL_URL)
        // reference for vercel.com
        return `https://${process.env.VERCEL_URL}`;
    if (process.env.RENDER_INTERNAL_HOSTNAME)
        // reference for render.com
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}
export const trpc = createTRPCNext<AppRouter>({
    config(opts) {
        return {
            links: [
                httpBatchLink({
                    /**
                     * If you want to use SSR, you need to use the server's full URL
                     * @link https://trpc.io/docs/ssr
                     **/
                    url: `${getBaseUrl()}/api/trpc`,
                    // You can pass any HTTP headers you wish here
                    async headers() {
                        return {
                            // authorization: getAuthCookie(),
                            'x-ssr': '1', // Not sure if this works.
                        };
                    },
                }),
            ],
            transformer: superjson,
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     **/
    ssr: true,
    responseMeta(opts) {
        const { clientErrors } = opts;
        if (clientErrors.length) {
            // propagate first http error from API calls
            return {
                status: clientErrors[0]?.data?.httpStatus ?? 500,
            };
        }
        // cache full page for 1 day + revalidate once every second
        return {
            'Cache-Control': `s-maxage=1, stale-while-revalidate=${SECONDS_IN_A_DAY}`,
        };
    },
});