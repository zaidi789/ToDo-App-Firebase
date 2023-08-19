import {configureStore} from '@reduxjs/toolkit';
import TaskSlice from './TaskSlice';

export const store = configureStore({
  reducer: {
    allTasks: TaskSlice,
  },
});
