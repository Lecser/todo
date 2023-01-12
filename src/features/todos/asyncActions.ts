import { appActions } from '../../app/appSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { todoAPI, TodosResponse } from './api/todoAPI'
import { ThunkError } from '../../utils/models'
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError
} from '../../utils/error-utils'
import { AxiosError } from 'axios/index'
import { ResultStatus } from '../login/api/authAPI'

const { setAppStatus } = appActions
export const fetchTodos = createAsyncThunk<
  { todos: TodosResponse[] },
  undefined,
  ThunkError
>('todo/fetchTodos', async (_, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus('loading'))
  try {
    thunkAPI.dispatch(setAppStatus('succeeded'))
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
  thunkAPI.dispatch(setAppStatus('loading'))
  try {
    const res = await todoAPI.updateTodoTitle(todoId, newTitle)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    } else {
      thunkAPI.dispatch(setAppStatus('succeeded'))
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
  thunkAPI.dispatch(setAppStatus('loading'))
  try {
    const res = await todoAPI.addTodo(title)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, true)
    } else {
      thunkAPI.dispatch(setAppStatus('succeeded'))
      return { newTodo: res.data.data.item }
    }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const removeTodo = createAsyncThunk(
  'todo/removeTodo',
  async (todoId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'))
    try {
      const res = await todoAPI.removeTodo(todoId)
      if (res.data.resultCode !== ResultStatus.OK) {
        return handleAsyncServerAppError(res.data, thunkAPI, false)
      } else {
        thunkAPI.dispatch(setAppStatus('succeeded'))
        return todoId
      }
    } catch (e) {
      return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
    }
  }
)

export const todosAsyncActions = {
  fetchTodos,
  updateTodoTitle,
  addNewTodo,
  removeTodo
}
