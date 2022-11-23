import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import payslipsApi from '../../../middleware/api/Finance/Payslips/payslipsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeePayslips,
  PaySlipsState,
} from '../../../types/Finance/Payslips/payslipsTypes'

const employeePaySlips = createAsyncThunk(
  'PaySlips/empPaySlips',
  async (
    {
      empId,
      year,
    }: {
      empId: number
      year: number
    },
    thunkApi,
  ) => {
    try {
      return await payslipsApi.empPaySlips({ empId, year })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialPaySlipsState: PaySlipsState = {
  employeePaySlips: [],
  isLoading: ApiLoadingState.idle,
  error: null,
}

const paySlipsSlice = createSlice({
  name: 'PaySlips',
  initialState: initialPaySlipsState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(employeePaySlips.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeePaySlips = action.payload
      })
      .addCase(employeePaySlips.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(employeePaySlips.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
  },
})

const isLoading = (state: RootState): LoadingState => state.paySlips.isLoading

const payslipsList = (state: RootState): EmployeePayslips[] =>
  state.paySlips.employeePaySlips

const paySlipsThunk = {
  employeePaySlips,
}

const paySlipsSelectors = {
  isLoading,
  payslipsList,
}

export const paySlipsService = {
  ...paySlipsThunk,
  actions: paySlipsSlice.actions,
  selectors: paySlipsSelectors,
}

export default paySlipsSlice.reducer
