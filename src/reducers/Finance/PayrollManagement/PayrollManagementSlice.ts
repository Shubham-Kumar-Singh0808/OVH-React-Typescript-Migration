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
  ReadExcelFile,
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

const updatePayslip = createAsyncThunk(
  'payrollManagement/updatePayslip',
  async (data: CurrentPayslip, thunkApi) => {
    try {
      return await PayrollManagementApi.updatePayslip(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteCheckedPayslips = createAsyncThunk(
  'payrollManagement/deleteCheckedPayslips',
  async (paySlipId: number[], thunkApi) => {
    try {
      return await PayrollManagementApi.deleteCheckedPayslips(paySlipId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const readExcelFile = createAsyncThunk(
  'payrollManagement/readExcelFile',
  async (file: FormData, thunkApi) => {
    try {
      return await PayrollManagementApi.readExcelFile(file)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const saveExcelFile = createAsyncThunk(
  'payrollManagement/saveExcelFile',
  async (
    {
      month,
      year,
    }: {
      month: string
      year: number
    },
    thunkApi,
  ) => {
    try {
      return await PayrollManagementApi.saveExcelFile({
        month,
        year,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const clearDirectory = createAsyncThunk(
  'panDetails/clearDirectory',
  async (_, thunkApi) => {
    try {
      return await PayrollManagementApi.clearDirectory()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialPayrollManagementState: PayRollManagementSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  currentPaySlipData: {} as GetPaySlipReportResponse,
  listSize: 0,
  paySlipInfo: [],
  paySlipList: { list: [], size: 0 },
  editPayslip: {} as CurrentPayslip,
  excelData: [],
  uploadExcelFile: [],
}
const payrollManagementSlice = createSlice({
  name: 'payrollManagement',
  initialState: initialPayrollManagementState,
  reducers: {
    clearPayrollManagement: (state) => {
      state.paySlipList.list = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readExcelFile.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.excelData = action.payload
      })
      .addCase(saveExcelFile.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.uploadExcelFile = action.payload
      })
      .addMatcher(
        isAnyOf(getCurrentPayslip.fulfilled, searchEmployee.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.paySlipList = action.payload
        },
      )
      .addMatcher(isAnyOf(updatePayslip.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editPayslip = action.payload
      })
      .addMatcher(
        isAnyOf(
          deletePayslip.fulfilled,
          downloadExcelFile.fulfilled,
          deleteCheckedPayslips.fulfilled,
          searchEmployee.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          deletePayslip.pending,
          deleteCheckedPayslips.pending,
          searchEmployee.pending,
          downloadExcelFile.pending,
          updatePayslip.pending,
          readExcelFile.pending,
          getCurrentPayslip.pending,
          saveExcelFile.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          deletePayslip.rejected,
          searchEmployee.rejected,
          downloadExcelFile.rejected,
          updatePayslip.rejected,
          deleteCheckedPayslips.rejected,
          readExcelFile.rejected,
          getCurrentPayslip.rejected,
          saveExcelFile.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.payrollManagement.isLoading

const paySlipList = (state: RootState): CurrentPayslip[] =>
  state.payrollManagement.paySlipList?.list

const PaySlipsListSize = (state: RootState): number =>
  state.payrollManagement.paySlipList?.size

const editPayslip = (state: RootState): CurrentPayslip =>
  state.payrollManagement.editPayslip

const excelData = (state: RootState): ReadExcelFile[] =>
  state.payrollManagement.excelData

export const payrollManagementThunk = {
  getCurrentPayslip,
  downloadExcelFile,
  searchEmployee,
  deletePayslip,
  updatePayslip,
  deleteCheckedPayslips,
  readExcelFile,
  saveExcelFile,
  clearDirectory,
}

export const payrollManagementSelectors = {
  isLoading,
  paySlipList,
  PaySlipsListSize,
  editPayslip,
  excelData,
}

export const payrollManagementService = {
  ...payrollManagementThunk,
  actions: payrollManagementSlice.actions,
  selectors: payrollManagementSelectors,
}

export default payrollManagementSlice.reducer
