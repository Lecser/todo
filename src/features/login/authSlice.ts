import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authMe } from './asyncActions'

interface Initial {
  isLoggedIn: boolean
  isAuth: boolean
}

const initialState: Initial = {
  isLoggedIn: false,
  isAuth: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },

    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    }
  },
  extraReducers: builder =>
    builder.addCase(authMe.fulfilled, state => {
      state.isAuth = true
    })
})

export const { actions: authActions } = authSlice
