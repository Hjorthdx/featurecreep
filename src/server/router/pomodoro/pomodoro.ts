import { timerRouter } from './timer';
import { pomodoroFormatRouter } from './pomodoroFormat';
import { router } from '../../trpc';

export const pomodoroRouter = router({
    timer: timerRouter,
    format: pomodoroFormatRouter,
});
