import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PomodoroState {}

export const pomodoroSlice = createSlice({
    name: 'Pomodoro slice',
    initialState: { completedTasks: [] } as PomodoroState,
    reducers: {},
});

export const PomodoroSliceReducer = pomodoroSlice.reducer;
export const {} = pomodoroSlice.actions;
