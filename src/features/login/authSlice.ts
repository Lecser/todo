import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Initial {
  isLoggedIn: boolean
}

const initialState: Initial = {
  isLoggedIn: false
}

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
