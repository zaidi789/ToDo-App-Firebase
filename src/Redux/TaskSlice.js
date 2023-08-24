import {createSlice} from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask(state, action) {
      //   console.log('recieved tasks----', action.payload);
      state.push(action.payload);
    },
    addSubtask(state, action) {
      const {parentTaskId, subtask} = action.payload;
      const parentTaskIndex = state.findIndex(task => task.id === parentTaskId);

      if (parentTaskIndex !== -1) {
        state[parentTaskIndex].subtasks.push(subtask);
      }
    },
    deleteSubtask(state, action) {
      const {parentTaskId, subtaskId} = action.payload;
      const parentTaskIndex = state.findIndex(task => task.id === parentTaskId);

      if (parentTaskIndex !== -1) {
        const subtaskIndex = state[parentTaskIndex].subtasks.findIndex(
          subtask => subtask.id === subtaskId,
        );
        if (subtaskIndex !== -1) {
          state[parentTaskIndex].subtasks.splice(subtaskIndex, 1);
        }
      }
    },
    onLogOut(state, action) {
      state.splice(0, state.length);
    },
    completeTask(state, action) {
      const taskId = action.payload;
      const taskIndex = state.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state[taskIndex].priority = false;
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
    removePriority(state, action) {
      const taskId = action.payload;
      const taskIndex = state.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        state[taskIndex].priority = false;
      }
    },
    deleteTask(state, action) {
      const taskId = action.payload;
      const taskIndex = state.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.splice(taskIndex, 1);
      }
    },
    updateTask(state, action) {
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
  updateTask,
  unarchiveTask,
  removePriority,
  onLogOut,
  addSubtask,
  editSubtask,
  deleteSubtask,
} = taskSlice.actions;
export default taskSlice.reducer;
