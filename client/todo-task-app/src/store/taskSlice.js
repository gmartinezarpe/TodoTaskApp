import { createSlice } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
  name: "task",
  initialState: { isLoading: true, tasks: [], active: null },
  reducers: {
    onLoadTasks: (state, { payload = {} }) => {
      state.isLoadingTasks = false;
      payload.forEach((task) => {
        const exists = state.tasks.some((dbTask) => dbTask._id === task._id);
        if (!exists) {
          state.tasks.push(task);
        }
      });
    },
    onAddNewTask: (state, { payload }) => {
      state.tasks.push(payload);
      state.active = null;
    },
    onDeleteTask: (state) => {
      if (state.activeTask) {
        state.tasks = state.tasks.filter(
          (task) => task.id !== state.activeTask.id
        );
        state.activeTask = null;
      }
    },
  },
});
export const { onLoadTasks, onAddNewTask, onDeleteTask } = taskSlice.actions;
