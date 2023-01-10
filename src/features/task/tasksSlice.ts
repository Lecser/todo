import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchTodos } from '../todos/todoSlice'
import { Tasks, tasksAPI, UpdateTaskRequestPayload } from './api/tasksAPI'
import { ThunkError } from '../../utils/models'
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError
} from '../../utils/error-utils'
import { appActions } from '../../app/CommonActions/CommonActions'
import { AxiosError } from 'axios'
import { todoAPI, TodosResponse } from '../todos/api/todoAPI'
import { ResultStatus } from '../login/api/authAPI'
import { Task } from './Task'
import { RootState } from '../../app/providers/config/store'

interface initialState {
  [key: string]: Tasks[]
}
const { setAppStatus } = appActions
const initialState: initialState = {}

export const fetchTasks = createAsyncThunk<
  { tasks: Tasks[]; todoId: string },
  string,
  ThunkError
>('tasks/fetchTasks', async (todoId, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
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
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await tasksAPI.createTask(todoId, title)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    } else {
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
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
>('task/removeTask', async (params, thunkAPI) => {
  const { todoId, taskId } = params
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await tasksAPI.removeTask(todoId, taskId)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    } else {
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
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
    return thunkAPI.rejectWithValue('task not found in the state')
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

  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await tasksAPI.updateTask(todoId, taskId, updatedTaskData)
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    } else {
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
      return params
    }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

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
export const {} = tasksSlice.actions
