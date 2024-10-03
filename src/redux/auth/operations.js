import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const apiClient = axios.create({
  baseURL: 'https://connections-api.goit.global/',
})

const setAuthToken = (token) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthToken = () => {
  apiClient.defaults.headers.common.Authorization = ``
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('users/signup', credentials)
      setAuthToken(data.token)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('users/login', credentials)
      setAuthToken(data.token)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post('users/logout')
      clearAuthToken()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token
    if (!token) {
      return rejectWithValue("Token doesn't exist")
    }
    try {
      setAuthToken(token)
      const { data } = await apiClient.get('users/current')
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)