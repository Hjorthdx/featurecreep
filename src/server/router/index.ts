// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { pomodoroRouter } from './pomodoro/pomodoro';
import { duneRouter } from './dune/dune';

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('auth.', authRouter)
    .merge('pomodoro.', pomodoroRouter)
    .merge('dune.', duneRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
