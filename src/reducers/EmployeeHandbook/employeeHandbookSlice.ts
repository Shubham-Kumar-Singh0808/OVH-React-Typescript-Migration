import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Axios, AxiosError } from 'axios'
import { act } from 'react-dom/test-utils'
import { ApiLoadingState } from '../../middleware/api/apiList'
import employeeHandbookApi from '../../middleware/api/EmployeeHandbook/employeeHandbook'
import { ValidationError } from '../../types/commonTypes'
import {
  EmployeeHandbooksState,
  GetHandbooksResponse,
} from '../../types/EmployeeHandbook/employeeHandbookTypes'

const getHandbooks = createAsyncThunk(
  'employeeHandbook/getHandbooks',
  async (handbook: string | undefined, thunkApi) => {
    try {
      return await employeeHandbookApi.getHandbooks()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialHandbooksState: EmployeeHandbooksState = {
  handbooksList: [],
  isLoading: ApiLoadingState.idle,
  error: null,
}

const employeeHandboookSlice = createSlice({
  name: 'handbooks',
  initialState: initialHandbooksState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHandbooks.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getHandbooks.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.handbooksList = action.payload as GetHandbooksResponse
      })
  },
})
