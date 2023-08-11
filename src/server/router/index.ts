// src/server/router/index.ts

import { pomodoroRouter } from './pomodoro/pomodoro';
import { duneRouter } from './dune/dune';
import { universityRouter } from './university/university';
import { router } from '../trpc';

export const appRouter = router({
    pomodoro: pomodoroRouter,
    dune: duneRouter,
    university: universityRouter,
});

export type AppRouter = typeof appRouter;