import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from '../../../../features/login/authSlice'
import { todoSlice } from '../../../../features/todos/todoSlice'
import { tasksSlice } from '../../../../features/tasks/tasksSlice'
import { appSlice } from '../../../appSlice'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    todo: todoSlice.reducer,
    tasks: tasksSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
