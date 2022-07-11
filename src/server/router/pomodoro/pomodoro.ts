import { TRPCError } from '@trpc/server';
import { createRouter } from '../context';
import { timerRouter } from './timer';
import { pomodoroFormatRouter } from './pomodoroFormat';

export const pomodoroRouter = createRouter()
    .middleware(async ({ ctx, next }) => {
        // Any queries or mutations after this middleware will
        // raise an error unless there is a current session
        if (!ctx.session) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        if (!ctx.session.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        // We need to do this because else TS won't understand that the middleware have now ensured that session and session user it not null.
        return next({
            ctx: {
                ...ctx,
                session: {
                    ...ctx.session,
                    user: {
                        ...ctx.session.user,
                    },
                },
            },
        });
    })
    .merge('timer.', timerRouter)
    .merge('format.', pomodoroFormatRouter);
