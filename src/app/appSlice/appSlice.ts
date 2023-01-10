import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authAPI, ResultStatus } from '../../features/login/api/authAPI'
import { setIsLoggedIn } from '../../features/login/authSlice'
import { handleAsyncServerNetworkError } from '../../utils/error-utils'
import { AxiosError } from 'axios'

interface Initial {
  status: RequestStatusType
  error: string | null
  isAuth: boolean
}

const initialState: Initial = {
  status: 'idle',
  error: null,
  isAuth: false
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const authMe = createAsyncThunk('app/authMe', async (_, thunkAPI) => {
  try {
    const res = await authAPI.authMe()
    if (res.data.resultCode === ResultStatus.OK) {
      thunkAPI.dispatch(setIsLoggedIn(true))
    }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(authMe.fulfilled, state => {
      state.isAuth = true
    })
})
export const {} = appSlice.actions
