import { createSlice } from '@reduxjs/toolkit'

import { Tasks } from './api/tasksAPI'
import {
  addNewTask,
  fetchTasks,
  removeTask,
  updateTaskTitle
} from './asyncActions'
import { fetchTodos } from '../todos/asyncActions'

interface initialState {
  [key: string]: Tasks[]
}
const initialState: initialState = {}

export const tasksSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        action.payload?.todos.forEach(tl => {
          state[tl.id] = []
        })
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload?.todoId] = action.payload?.tasks
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state[action.payload.todoListId]?.unshift(action.payload)
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoId].findIndex(
          ta => ta.id === action.payload.taskId
        )
        if (index !== -1) state[action.payload.todoId].splice(index, 1)
      })
      .addCase(updateTaskTitle.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoId]
        const index = tasks.findIndex(ta => ta.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = {
            ...tasks[index],
            ...action.payload.model
          }
        }
      })
  }
})
export const { actions: tasksActions } = tasksSlice
