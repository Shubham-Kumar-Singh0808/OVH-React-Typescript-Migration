import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import leaveReportsApi from '../../../middleware/api/Leaves/LeaveReports/leaveReportApi'
import {
  LeaveReportsProps,
  SearchLeaveReportsProps,
  SelectFinancialYear,
  LeaveReportState,
  LeaveSummaries,
} from '../../../types/Leaves/LeaveReports/leaveReportTypes'

const getAllEmployeesLeaveSummaries = createAsyncThunk(
  'leaveReports/getAllEmployeesLeaveSummaries',
  async (props: LeaveReportsProps, thunkApi) => {
    try {
      return await leaveReportsApi.getAllEmployeesLeaveSummaries(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const searchLeaveSummaries = createAsyncThunk(
  'leaveReports/searchLeaveSummaries',
  async (props: SearchLeaveReportsProps, thunkApi) => {
    try {
      return await leaveReportsApi.searchLeaveSummaries(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const creditedYearDetails = createAsyncThunk<
  SelectFinancialYear[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('leaveReports/creditedYearDetails', async (_, thunkApi) => {
  try {
    return await leaveReportsApi.creditedYearDetails()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getFinancialYear = createAsyncThunk<
  number | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('leaveReports/financialYear', async (_, thunkApi) => {
  try {
    return await leaveReportsApi.getFinancialYear()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialLeaveReportState: LeaveReportState = {
  leaveSummaries: { list: [], size: 0, name: '', length: 0 },
  selectFinancialYear: [],
  isLoading: ApiLoadingState.idle,
  error: null,
  financialYear: 0,
  listSize: 0,
}

const leaveReportSlice = createSlice({
  name: 'leaveReports',
  initialState: initialLeaveReportState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployeesLeaveSummaries.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.leaveSummaries = action.payload
        state.listSize = action.payload.size
      })
      .addCase(creditedYearDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.selectFinancialYear = action.payload as SelectFinancialYear[]
      })
      .addCase(getFinancialYear.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.financialYear = action.payload as number
      })
      .addCase(searchLeaveSummaries.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.leaveSummaries = action.payload
      })
      .addMatcher(isAnyOf(getAllEmployeesLeaveSummaries.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const leaveReportThunk = {
  getAllEmployeesLeaveSummaries,
  searchLeaveSummaries,
  creditedYearDetails,
  getFinancialYear,
}

const isLoading = (state: RootState): LoadingState =>
  state.leaveReport.isLoading

const getLeaveReport = (state: RootState): LeaveSummaries =>
  state.leaveReport.leaveSummaries

const creditedYears = (state: RootState): SelectFinancialYear[] =>
  state.leaveReport.selectFinancialYear

const financialYear = (state: RootState): number =>
  state.leaveReport.financialYear

const listSize = (state: RootState): number => state.leaveReport.listSize

const leaveReportSelectors = {
  getLeaveReport,
  creditedYears,
  isLoading,
  financialYear,
  listSize,
}

export const leaveReportService = {
  ...leaveReportThunk,
  actions: leaveReportSlice.actions,
  selectors: leaveReportSelectors,
}

export default leaveReportSlice.reducer
