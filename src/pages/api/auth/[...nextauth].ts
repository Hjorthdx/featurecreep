import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import EmailProvider from 'next-auth/providers/email';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import RedditProvider from 'next-auth/providers/reddit';
import TwitchProvider from 'next-auth/providers/twitch';
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
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID ?? '',
            clientSecret: process.env.FACEBOOK_SECRET ?? '',
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? '',
        }),
        RedditProvider({
            clientId: process.env.REDDIT_ID,
            clientSecret: process.env.REDDIT_SECRET,
        }),
        TwitchProvider({
            clientId: process.env.TWITCH_ID ?? '',
            clientSecret: process.env.TWITCH_SECRET ?? '',
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID ?? '',
            clientSecret: process.env.TWITTER_SECRET ?? '',
            version: '2.0', // opt-in to Twitter OAuth 2.0
        }),
        /*
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
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),*/
    ],
    debug: true,
};

export default NextAuth(authOptions);
