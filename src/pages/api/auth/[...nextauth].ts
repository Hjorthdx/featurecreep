import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_ID ?? '',
            clientSecret: process.env.DISCORD_SECRET ?? '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? '',
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID ?? '',
            clientSecret: process.env.TWITTER_SECRET ?? '',
            version: '2.0', // opt-in to Twitter OAuth 2.0
        }),
        // Not done...
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: {
                    label: 'Name',
                    type: 'text',
                    placeholder: 'Enter your name',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter your password',
                },
            },
            async authorize(credentials, _req) {
                const user = { id: 1, name: credentials?.name ?? 'J Smith' };
                return user;
            },
        }),
    ],
    debug: true,
};

export default NextAuth(authOptions);
