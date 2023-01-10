import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError
} from '../../utils/error-utils'
import { todoAPI, TodosResponse } from './api/todoAPI'
import { ThunkError } from '../../utils/models'
import { appActions } from '../../app/CommonActions/CommonActions'
import { AxiosError } from 'axios'
import { ResultStatus } from '../login/api/authAPI'

const initialState = [] as TodosResponse[]

const { setAppStatus } = appActions
export const fetchTodos = createAsyncThunk<
  { todos: TodosResponse[] },
  undefined,
  ThunkError
>('todo/fetchTodos', async (_, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
    const res = await todoAPI.fetchTodos()
    return { todos: res.data }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const updateTodoTitle = createAsyncThunk<
  { todoId: string; newTitle: string },
  { todoId: string; newTitle: string },
  ThunkError
>('todo/updateTodoTitle', async (params, thunkAPI) => {
  const { todoId, newTitle } = params
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await todoAPI.updateTodoTitle(todoId, newTitle)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    } else {
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
      return { todoId: todoId, newTitle: newTitle }
    }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const addNewTodo = createAsyncThunk<
  { newTodo: TodosResponse },
  string,
  ThunkError
>('todo/addNewTodo', async (title, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await todoAPI.addTodo(title)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    } else {
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
      return { newTodo: res.data.data.item }
    }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const removeTodo = createAsyncThunk(
  'todo/removeTodo',
  async (todoId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await todoAPI.removeTodo(todoId)
      if (res.data.resultCode !== ResultStatus.OK) {
        return handleAsyncServerAppError(res.data, thunkAPI, false)
      } else {
        thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
        return todoId
      }
    } catch (e) {
      return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
    }
  }
)

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
