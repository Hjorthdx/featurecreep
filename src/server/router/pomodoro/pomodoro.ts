import { createRouter } from '../context';
import { timerRouter } from './timer';
import { pomodoroFormatRouter } from './pomodoroFormat';

export const pomodoroRouter = createRouter().merge('timer.', timerRouter).merge('format.', pomodoroFormatRouter);
