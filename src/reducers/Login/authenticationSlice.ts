import { AppDispatch, RootState } from '../../stateStore'
import {
  AuthenticationStateType,
  UserCredentials,
  UserDataType,
  ValidationError,
} from '../../types/Login/authenticationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { postLoginUser } from '../../middleware/api/Login/authenticationApi'

const initialAuthenticationState: AuthenticationStateType = {
  employeeName: '',
  employeeId: '',
  userName: '',
  role: '',
  tenantKey: '',
  token: '',
  designation: '',
  error: null,
  isLoading: false,
}

export const doLoginUser = createAsyncThunk<
  UserDataType | undefined,
  UserCredentials,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'authentication/doLoginUser',
  async ({ username, password, tenantKey }: UserCredentials, thunkApi) => {
    try {
      return await postLoginUser({
        username,
        password,
        tenantKey,
      })
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
        console.log(action.payload)
        state.error = action.payload as ValidationError
      })
  },
})

export const { setAuthentication, clearError } = authenticationSlice.actions

export const selectError = (state: RootState): ValidationError =>
  state.authentication.error
export const selectToken = (state: RootState): string =>
  state.authentication.token

export default authenticationSlice.reducer
