import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from 'prisma/prisma-client';

export interface PomodoroState {
    completedTasks: Task[];
}

export const pomodoroSlice = createSlice({
    name: 'Pomodoro slice',
    initialState: { completedTasks: [] } as PomodoroState,
    reducers: {
        addCompletedTask(state: PomodoroState, { payload: completedTask }: PayloadAction<Task>) {
            state.completedTasks.push(completedTask);
        },
        removeCompletedTask(state: PomodoroState, { payload: completedTask }: PayloadAction<Task>) {
            state.completedTasks = state.completedTasks.filter((task) => task.id !== completedTask.id);
        },
    },
});

export const PomodoroSliceReducer = pomodoroSlice.reducer;
export const { addCompletedTask, removeCompletedTask } = pomodoroSlice.actions;
