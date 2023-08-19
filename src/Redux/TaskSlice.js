import {createSlice} from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask(state, action) {
      //   console.log('recieved tasks----', action.payload);
      state.push(action.payload);
    },
    completeTask(state, action) {
      const taskId = action.payload;
      const taskIndex = state.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state[taskIndex].completed = true;
      }
    },
    addArchive(state, action) {
      const taskId = action.payload;
      const taskIndex = state.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        state[taskIndex].archive = true;
      }
    },
    unarchiveTask(state, action) {
      const taskId = action.payload;
      const taskIndex = state.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        state[taskIndex].archive = false;
      }
    },
    deleteTask(state, action) {
      const taskId = action.payload;
      const taskIndex = state.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        state.splice(taskIndex, 1);
      }
    },
    editTask(state, action) {
      const {id, title, description, date, priority} = action.payload;
      const taskIndex = state.findIndex(task => task.id === id);

      if (taskIndex !== -1) {
        state[taskIndex].title = title;
        state[taskIndex].description = description;
        state[taskIndex].date = date;
        state[taskIndex].priority = priority;
      }
    },
  },
});

export const {
  addTask,
  completeTask,
  addArchive,
  deleteTask,
  editTask,
  unarchiveTask,
} = taskSlice.actions;
export default taskSlice.reducer;
