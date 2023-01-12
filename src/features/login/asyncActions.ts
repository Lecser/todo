import { createAsyncThunk } from '@reduxjs/toolkit'

import { appActions } from '../../app/appSlice'
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError
} from '../../utils/error-utils'
import { AxiosError } from 'axios/index'
import { LoginRequestPayload } from './api/authModel'
import { authAPI } from './api/authAPI'
import { ResultStatus } from '../../utils/model'
import { authActions } from './authSlice'

export const authMe = createAsyncThunk('login/authMe', async (_, thunkAPI) => {
  try {
    const res = await authAPI.authMe()
    if (res.data.resultCode !== ResultStatus.OK) {
      return handleAsyncServerAppError(res.data, thunkAPI, true)
    } else {
      thunkAPI.dispatch(authActions.setIsLoggedIn(true))
    }
  } catch (e) {
    return handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
  }
})

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginDataPayload: LoginRequestPayload, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus('loading'))
    try {
      const res = await authAPI.loginUser(loginDataPayload)
      if (res.data.resultCode !== ResultStatus.OK) {
        handleAsyncServerAppError(res.data, thunkAPI, true)
      } else {
        thunkAPI.dispatch(authActions.setAuth(true))
        thunkAPI.dispatch(appActions.setAppStatus('succeeded'))
        thunkAPI.dispatch(authActions.setIsLoggedIn(true))
      }
    } catch (e) {
      handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
    }
  }
)
