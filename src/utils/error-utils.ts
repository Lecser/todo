import { Iresponse } from '../features/login/api/authAPI'
import { AxiosError } from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { appActions } from '../app/CommonActions/CommonActions'

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
      appActions.setAppError({
        error: data.messages.length ? data.messages[0] : 'Some error occurred'
      })
    )
  }
  thunkAPI.dispatch(appActions.setAppStatus({ status: 'failed' }))
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
      appActions.setAppError({
        error: error.message ? error.message : 'Some error occurred'
      })
    )
  }
  thunkAPI.dispatch(appActions.setAppStatus({ status: 'failed' }))

  return thunkAPI.rejectWithValue({
    errors: [error.message],
    fieldsErrors: undefined
  })
}
