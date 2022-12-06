import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.payrollManagement.isLoading

const paySlipInfo = (state: RootState): CurrentPayslip[] =>
  state.payrollManagement.paySlipInfo

export const payrollManagementThunk = {
  getCurrentPayslip,
  downloadExcelFile,
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
