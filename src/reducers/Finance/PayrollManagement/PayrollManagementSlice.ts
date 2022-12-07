import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import PayrollManagementApi from '../../../middleware/api/Finance/PayrollManagement/PayrollManagementApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  CurrentPayslip,
  DownloadExcelFile,
  GetPayRollProps,
  GetPaySlipReportResponse,
  PayRollManagementApiProps,
  PayRollManagementSliceState,
} from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const getCurrentPayslip = createAsyncThunk(
  'payrollManagement/getCurrentPayslip',
  async (props: GetPayRollProps, thunkApi) => {
    try {
      return await PayrollManagementApi.getCurrentPayslip(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const downloadExcelFile = createAsyncThunk(
  'payrollManagement/downloadExcelFile',
  async (prepareObject: DownloadExcelFile, thunkApi) => {
    try {
      return await PayrollManagementApi.downloadExcelFile(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const searchEmployee = createAsyncThunk(
  'payrollManagement/searchEmployee',
  async (props: PayRollManagementApiProps, thunkApi) => {
    try {
      return await PayrollManagementApi.searchEmployee(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deletePayslip = createAsyncThunk(
  'payrollManagement/deletePayslip',
  async (paySlipId: number, thunkApi) => {
    try {
      return await PayrollManagementApi.deletePayslip(paySlipId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialPayrollManagementState: PayRollManagementSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  currentPaySlipData: {} as GetPaySlipReportResponse,
  listSize: 0,
  paySlipInfo: [],
}
const payrollManagementSlice = createSlice({
  name: 'payrollManagement',
  initialState: initialPayrollManagementState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentPayslip.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.paySlipInfo = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getCurrentPayslip.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getCurrentPayslip.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
      .addMatcher(
        isAnyOf(
          getCurrentPayslip.fulfilled,
          deletePayslip.fulfilled,
          searchEmployee.fulfilled,
          downloadExcelFile.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getCurrentPayslip.pending,
          deletePayslip.pending,
          searchEmployee.pending,
          downloadExcelFile.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getCurrentPayslip.rejected,
          deletePayslip.rejected,
          searchEmployee.rejected,
          downloadExcelFile.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.payrollManagement.isLoading

const paySlipInfo = (state: RootState): CurrentPayslip[] =>
  state.payrollManagement.paySlipInfo

export const payrollManagementThunk = {
  getCurrentPayslip,
  downloadExcelFile,
  searchEmployee,
  deletePayslip,
}

export const payrollManagementSelectors = {
  isLoading,
  paySlipInfo,
}

export const payrollManagementService = {
  ...payrollManagementThunk,
  actions: payrollManagementSlice.actions,
  selectors: payrollManagementSelectors,
}

export default payrollManagementSlice.reducer
