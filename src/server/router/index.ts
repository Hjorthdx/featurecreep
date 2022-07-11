// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { pomodoroRouter } from './pomodoro/pomodoro';

export const appRouter = createRouter().transformer(superjson).merge('auth.', authRouter).merge('pomodoro.', pomodoroRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
