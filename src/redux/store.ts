import { configureStore } from '@reduxjs/toolkit';
import { PomodoroState, PomodoroSliceReducer } from './pomodoroSlice';

export const store = configureStore({
    reducer: {
        pomodoroSlice: PomodoroSliceReducer,
    },
});

export interface State {
    pomodoroSlice: PomodoroState;
}
