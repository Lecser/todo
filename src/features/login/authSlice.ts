import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authAPI, LoginRequestPayload, ResultStatus } from './api/authAPI'
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError
} from '../../utils/error-utils'
import { appActions } from '../../app/CommonActions/CommonActions'
import { AxiosError } from 'axios'

interface Initial {
  isLoggedIn: boolean
}

const initialState: Initial = {
  isLoggedIn: false
}
const { setAppStatus } = appActions
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginDataPayload: LoginRequestPayload, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await authAPI.loginUser(loginDataPayload)
      if (res.data.resultCode !== ResultStatus.OK) {
        handleAsyncServerAppError(res.data, thunkAPI)
      } else {
        thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
        thunkAPI.dispatch(setIsLoggedIn(true))
      }
    } catch (e) {
      handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    }
  }
})
export const { setIsLoggedIn } = authSlice.actions
