import { AppDispatch, RootState } from '../../stateStore'
import {
  AuthenticatedUser,
  AuthenticationState,
  LoginCredentials,
} from '../../types/Login/authenticationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../types/commonTypes'
import { postLoginUser } from '../../middleware/api/Login/authenticationApi'

const initialAuthenticationState = {} as AuthenticationState

export const doLoginUser = createAsyncThunk<
  { authenticatedUser: AuthenticatedUser } | undefined,
  LoginCredentials,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'authentication/doLoginUser',
  async (userCredentials: LoginCredentials, thunkApi) => {
    try {
      return await postLoginUser(
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
      .addCase(doLoginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doLoginUser.fulfilled, (state, action) => {
        return { ...state, ...action.payload, isLoading: false }
      })
      .addCase(doLoginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationError
      })
  },
})

export const { setAuthentication, clearAuthentication, clearError } =
  authenticationSlice.actions

export const selectError = (state: RootState): ValidationError =>
  state.authentication.error
export const selectToken = (state: RootState): string =>
  state.authentication.authenticatedUser.token
export const selectEmployeeId = (state: RootState): number =>
  state.authentication.authenticatedUser.employeeId as number

export default authenticationSlice.reducer
