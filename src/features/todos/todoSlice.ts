import { createSlice } from '@reduxjs/toolkit'
import { TodosResponse } from './api/todoAPI'
import {
  addNewTodo,
  fetchTodos,
  removeTodo,
  updateTodoTitle
} from './asyncActions'

const initialState = [] as TodosResponse[]

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload?.todos.map(tl => ({
          ...tl,
          filter: 'all',
          entityStatus: 'idle'
        }))
      })
      .addCase(updateTodoTitle.fulfilled, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.todoId)
        state[index].title = action.payload.newTitle
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.push({
          ...action.payload?.newTodo
        })
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload)
        if (index !== -1) state.splice(index, 1)
      })
})
export const {} = todoSlice.actions
