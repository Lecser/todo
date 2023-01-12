import { createAsyncThunk } from '@reduxjs/toolkit'

import { appActions } from '../../app/appSlice'
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError
} from '../../utils/error-utils'
import { AxiosError } from 'axios/index'

import { Tasks, tasksAPI, UpdateTaskRequestPayload } from './api/tasksAPI'
import { ThunkError } from '../../utils/models'
import { RootState } from '../../app/providers/StoreProvider/config/store'
import { ResultStatus } from '../login/api/authAPI'

const { setAppStatus } = appActions

export const fetchTasks = createAsyncThunk<
  { tasks: Tasks[]; todoId: string },
  string,
  ThunkError
>('tasks/fetchTasks', async (todoId, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus('loading'))
  try {
    thunkAPI.dispatch(setAppStatus('succeeded'))
    const res = await tasksAPI.fetchTasks(todoId)
    const tasks = res.data.items
    return { tasks, todoId }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const addNewTask = createAsyncThunk<
  Tasks,
  { todoId: string; title: string },
  ThunkError
>('tasks/addNewTask', async (params, thunkAPI) => {
  const { todoId, title } = params
  thunkAPI.dispatch(setAppStatus('loading'))
  try {
    const res = await tasksAPI.createTask(todoId, title)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    } else {
      thunkAPI.dispatch(setAppStatus('succeeded'))
      return res.data.data.item
    }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const removeTask = createAsyncThunk<
  { todoId: string; taskId: string },
  { todoId: string; taskId: string },
  ThunkError
>('tasks/removeTask', async (params, thunkAPI) => {
  const { todoId, taskId } = params
  thunkAPI.dispatch(setAppStatus('loading'))
  try {
    const res = await tasksAPI.removeTask(todoId, taskId)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    } else {
      thunkAPI.dispatch(setAppStatus('succeeded'))
      return { todoId, taskId }
    }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const updateTaskTitle = createAsyncThunk<
  { todoId: string; taskId: string; model: UpdateTaskRequestPayload },
  { todoId: string; taskId: string; model: UpdateTaskRequestPayload }
>('tasks/updateTaskTitle', async (params, thunkAPI) => {
  const { todoId, taskId, model } = params
  const state = thunkAPI.getState() as RootState

  const task = state.tasks[params.todoId].find(t => t.id === params.taskId)
  if (!task) {
    return thunkAPI.rejectWithValue('tasks not found in the state')
  }

  const updatedTaskData: UpdateTaskRequestPayload = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...model
  }

  thunkAPI.dispatch(setAppStatus('loading'))
  try {
    const res = await tasksAPI.updateTask(todoId, taskId, updatedTaskData)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    } else {
      thunkAPI.dispatch(setAppStatus('succeeded'))
      return params
    }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const tasksAsyncActions = {
  fetchTasks,
  addNewTask,
  updateTaskTitle,
  removeTask
}
