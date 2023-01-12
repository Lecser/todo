import { createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI, LoginRequestPayload, ResultStatus } from './api/authAPI'
import { appActions } from '../../app/appSlice'
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError
} from '../../utils/error-utils'
import { AxiosError } from 'axios/index'
import { setIsLoggedIn } from './authSlice'

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginDataPayload: LoginRequestPayload, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus('loading'))
    try {
      const res = await authAPI.loginUser(loginDataPayload)
      if (res.data.resultCode !== ResultStatus.OK) {
        handleAsyncServerAppError(res.data, thunkAPI)
      } else {
        thunkAPI.dispatch(appActions.setAppStatus('succeeded'))
        thunkAPI.dispatch(setIsLoggedIn(true))
      }
    } catch (e) {
      handleAsyncServerNetworkError(e as AxiosError, thunkAPI)
    }
  }
)
