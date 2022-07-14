import { TRPCError } from '@trpc/server';
import { createRouter } from '../context';
import { timerRouter } from './timer';
import { pomodoroFormatRouter } from './pomodoroFormat';
import { taskRouter } from './task';

export const pomodoroRouter = createRouter()
    // Figure out how to actually make this middleware work.
    // Currently still have to insert it in all al the merged routers beneath to tell ts that it cant be null...
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
    .merge('format.', pomodoroFormatRouter)
    .merge('task.', taskRouter);
