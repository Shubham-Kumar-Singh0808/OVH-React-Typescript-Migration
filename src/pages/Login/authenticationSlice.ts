import { authenticationLogin, methodGet } from '../../middleware/api/apiList'
import axios, { AxiosError } from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../stateStore'
import { encode } from 'base-64'
import { getUnauthenticatedRequestConfig } from '../../utils/apiUtils'

export type ReturnType = {
  employeeName: string
  employeeId: string
  userName: string
  role: string
  tenantKey: string
  token: string
}

export type UserCredentials = {
  username: string
  password: string
  tenantKey: string
}
export type ValidationError = { status: number; data: any }

interface AuthenticationStateType extends ReturnType {
  error: ValidationError
  isLoading: boolean
}

const initialAuthenticationState: AuthenticationStateType = {
  employeeName: '',
  employeeId: '',
  userName: '',
  role: '',
  tenantKey: '',
  token: '',
  error: { status: 0, data: '' },
  isLoading: false,
}

export const doLoginUser = createAsyncThunk<
  ReturnType,
  UserCredentials,
  {
    rejectValue: ValidationError
  }
>(
  'authentication/doLoginUser',
  async ({ username, password, tenantKey }: UserCredentials, thunkApi) => {
    console.log(thunkApi)
    const encodedCredentials = encode(`${username}:${password}`)

    const requestConfig = getUnauthenticatedRequestConfig({
      url: authenticationLogin,
      method: methodGet,
      additionalHeaders: {
        Authorization: `Basic ${encodedCredentials}`,
      },
      tenantKey,
    })

    let userAuthenticationData: ReturnType = {
      employeeName: '',
      employeeId: '',
      userName: '',
      role: '',
      tenantKey: '',
      token: '',
    }

    try {
      const response = await axios(requestConfig)

      if (response.status === 200) {
        const employeeName = `${response.data.employeeDto.firstName} ${response.data.employeeDto.lastName}`
        const employeeId = response.data.employeeDto.id
        const userName = response.data.employeeDto.userName
        const role = response.data.employeeDto.role
        const tenantKeyFromResponse = response.data.tenantKey
        const token = response.data.employeeDto.token
        const designation = response.data.employeeDto.designation

        localStorage.setItem('employeeName', employeeName)
        localStorage.setItem('employeeId', employeeId)
        localStorage.setItem('userName', userName)
        localStorage.setItem('role', role)
        localStorage.setItem('tenantKey', tenantKeyFromResponse)
        localStorage.setItem('token', token)
        localStorage.setItem('designation', designation)

        userAuthenticationData = {
          employeeName,
          employeeId,
          userName,
          role,
          tenantKey,
          token,
        }
      }
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue({
        status: err.response?.status,
        data: err.response?.data,
      } as ValidationError)
    }

    return userAuthenticationData
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
      state.error = { status: 0, data: '' }
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

export const { setAuthentication, clearError } = authenticationSlice.actions

export const selectError = (state: RootState): ValidationError =>
  state.authentication.error
export const selectToken = (state: RootState): string =>
  state.authentication.token

export default authenticationSlice.reducer
