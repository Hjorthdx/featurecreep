import { Session } from 'inspector';
import { Profile } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { User } from 'prisma/prisma-client';

declare module 'next-auth' {
    // How do I set this to be User type from Prisma.
    // Right now it's manually just pasted over...
    // Does this work?
    // If the generic User isn't passed, then second last line in jwt callback
    // in [...nextauth].ts fails.
    // This seems to work though.
    interface User<User> {
        [Key in User]: User[key];
    }
    interface Session {
        user?: User;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        user?: User;
    }
}
/*
declare module 'next-auth/core' {
    interface CallbacksOptions<P extends Record<string, unknown> = Profile, A extends Record<string, unknown> = Account> {
        session: (params: { session: Session; user: User; token: JWT }) => Awaitable<Session>;
    }
}*/
