import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RequestStatusType } from './model/appModel'

interface Initial {
  status: RequestStatusType
  error: string | null
}

const initialState: Initial = {
  status: 'idle',
  error: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.status = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})
export const { actions: appActions } = appSlice
