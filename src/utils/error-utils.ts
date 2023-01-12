import { Iresponse } from '../features/login/api/authAPI'
import { AxiosError } from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { appActions } from '../app/appSlice'

type ThunkAPIType = {
  dispatch: Dispatch
  rejectWithValue: Function
}

export const handleAsyncServerAppError = <D>(
  data: Iresponse<D>,
  thunkAPI: ThunkAPIType,
  showError = true
) => {
  if (showError) {
    thunkAPI.dispatch(
      appActions.setError(
        data.messages.length ? data.messages[0] : 'Some error occurred'
      )
    )
  }
  thunkAPI.dispatch(appActions.setAppStatus('failed'))
  return thunkAPI.rejectWithValue({
    errors: data.messages,
    fieldsErrors: data.fieldsErrors
  })
}

export const handleAsyncServerNetworkError = (
  error: AxiosError,
  thunkAPI: ThunkAPIType,
  showError = true
) => {
  if (showError) {
    thunkAPI.dispatch(
      appActions.setError(error.message ? error.message : 'Some error occurred')
    )
  }
  thunkAPI.dispatch(appActions.setAppStatus('failed'))

  return thunkAPI.rejectWithValue({
    errors: [error.message],
    fieldsErrors: undefined
  })
}
