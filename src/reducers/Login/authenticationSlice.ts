import { AppDispatch, RootState } from '../../stateStore'
import {
  AuthenticatedUser,
  AuthenticationState,
  LoginCredentials,
} from '../../types/Login/authenticationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../types/commonTypes'
import authenticationApi from '../../middleware/api/Login/authenticationApi'

const initialAuthenticationState = {} as AuthenticationState

const authenticateUser = createAsyncThunk<
  { authenticatedUser: AuthenticatedUser } | undefined,
  LoginCredentials,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'authentication/authenticateUser',
  async (userCredentials: LoginCredentials, thunkApi) => {
    try {
      return await authenticationApi.authenticateUser(
        userCredentials.username,
        userCredentials.password,
        userCredentials.tenantKey,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthenticationState,
  reducers: {
    setAuthentication: (state, action) => {
      return { ...state, ...action.payload }
    },
    clearAuthentication: (state) => {
      return { ...state, ...initialAuthenticationState }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        return { ...state, ...action.payload, isLoading: false }
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationError
      })
  },
})

const selectError = (state: RootState): ValidationError =>
  state.authentication.error
const selectToken = (state: RootState): string =>
  state.authentication.authenticatedUser.token
const selectEmployeeId = (state: RootState): string =>
  state.authentication.authenticatedUser.employeeId as string

export const authenticationThunk = {
  authenticateUser,
}

export const authenticationActions = authenticationSlice.actions

export const authenticationSelectors = {
  selectError,
  selectToken,
  selectEmployeeId,
}

export default authenticationSlice.reducer
