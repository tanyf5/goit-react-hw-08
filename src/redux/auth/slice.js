import { createSlice } from '@reduxjs/toolkit'
import { loginUser, logoutUser, refreshUser, registerUser } from './operations'

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(loginUser.pending, (state) => {
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true
        state.error = null
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.user.name = action.payload.name
        state.user.email = action.payload.email
        state.isRefreshing = false
        state.error = null
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload
      })

      .addCase(logoutUser.fulfilled, () => {
        return initialState
      })
  },
})

export const authReducer = authSlice.reducer