import { AppDispatch, RootState } from '../../stateStore'
import {
  AuthenticatedUserType,
  AuthenticationStateType,
  LoginCredentials,
} from '../../types/Login/authenticationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationErrorType } from '../../types/commonTypes'
import { postLoginUser } from '../../middleware/api/Login/authenticationApi'

const initialAuthenticationState = {} as AuthenticationStateType

export const doLoginUser = createAsyncThunk<
  { authenticatedUser: AuthenticatedUserType } | undefined,
  LoginCredentials,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
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
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
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
        state.error = action.payload as ValidationErrorType
      })
  },
})

export const { setAuthentication, clearAuthentication, clearError } =
  authenticationSlice.actions

export const selectError = (state: RootState): ValidationErrorType =>
  state.authentication.error
export const selectToken = (state: RootState): string =>
  state.authentication.authenticatedUser.token

export default authenticationSlice.reducer
