import { Session } from 'inspector';
import { Profile } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { User as PrismaUser } from 'prisma/prisma-client';

// Think it's fixed?
declare module 'next-auth' {
    // How do I set this to be User type from Prisma.
    // Right now it's manually just pasted over...
    interface User {
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        selectedPomodoroFormatId: string;
        riseOfIX: boolean;
        immortality: boolean;
    }
    interface Session {
        user: PrismaUser;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        user?: PrismaUser;
    }
}

declare module 'next-auth/core' {
    interface User extends PrismaUser {}
}
/*
declare module 'next-auth/core' {
    interface CallbacksOptions<P extends Record<string, unknown> = Profile, A extends Record<string, unknown> = Account> {
        session: (params: { session: Session; user: User; token: JWT }) => Awaitable<Session>;
    }
}*/
