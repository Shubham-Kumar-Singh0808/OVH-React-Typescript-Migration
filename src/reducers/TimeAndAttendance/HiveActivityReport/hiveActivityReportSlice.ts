import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import moment from 'moment'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import hiveActivityReportApi from '../../../middleware/api/TimeAndAttendance/HiveActivityReport/hiveActivityReportApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeeHiveReport,
  GetHiveActivityReportProps,
  GetManagerHiveActivityReportResponse,
  HiveActivityReportSliceState,
} from '../../../types/TimeAndAttendance/HiveActivityReport/hiveActivityReportTypes'
import { SelectedView } from '../../../types/TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportTypes'

const getEmployeeHiveActivityReport = createAsyncThunk(
  'hiveActivityReport/getEmployeeHiveActivityReport',
  async (props: GetHiveActivityReportProps, thunkApi) => {
    try {
      return await hiveActivityReportApi.getEmployeeHiveActivityReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getManagerHiveActivityReport = createAsyncThunk(
  'hiveActivityReport/getManagerHiveActivityReport',
  async (props: GetHiveActivityReportProps, thunkApi) => {
    try {
      return await hiveActivityReportApi.getManagerHiveActivityReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSearchHiveActivityReport = createAsyncThunk(
  'hiveActivityReport/getSearchHiveActivityReport',
  async (props: GetHiveActivityReportProps, thunkApi) => {
    try {
      return await hiveActivityReportApi.getSearchHiveActivityReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialHiveActivityReportSliceState: HiveActivityReportSliceState = {
  selectedDate: moment().subtract(1, 'months').format('M/YYYY'),
  selectedView: 'Me',
  managerHiveActivityReport: { list: [], size: 0 },
  employeeHiveActivityReport: {
    id: 0,
    userName: '',
    firstName: '',
    lastName: '',
    activityTimes: [],
    totalHiveTime: '',
    projectIdentifier: '',
  },
  isLoading: ApiLoadingState.idle,
  monthDisplay: moment(new Date()).format('MMMM-YYYY'),
}

const hiveActivityReportSlice = createSlice({
  name: 'hiveActivityReport',
  initialState: initialHiveActivityReportSliceState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
    setSelectedView: (state, action) => {
      state.selectedView = action.payload
    },
    setMonthDisplay: (state, action) => {
      state.monthDisplay = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeHiveActivityReport.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeHiveActivityReport = action.payload
      })
      .addMatcher(
        isAnyOf(
          getEmployeeHiveActivityReport.pending,
          getManagerHiveActivityReport.pending,
          getSearchHiveActivityReport.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getManagerHiveActivityReport.fulfilled,
          getSearchHiveActivityReport.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.managerHiveActivityReport = action.payload
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.hiveActivityReport.isLoading
const employeeHiveActivityReport = (state: RootState): EmployeeHiveReport =>
  state.hiveActivityReport.employeeHiveActivityReport
const managerHiveActivityReport = (
  state: RootState,
): GetManagerHiveActivityReportResponse =>
  state.hiveActivityReport.managerHiveActivityReport
const selectedDate = (state: RootState): string =>
  state.hiveActivityReport.selectedDate
const selectedView = (state: RootState): SelectedView =>
  state.hiveActivityReport.selectedView
const managerReportSize = (state: RootState): number =>
  state.hiveActivityReport.managerHiveActivityReport?.size
const monthDisplay = (state: RootState): string =>
  state.hiveActivityReport.monthDisplay

const hiveActivityReportThunk = {
  getEmployeeHiveActivityReport,
  getManagerHiveActivityReport,
  getSearchHiveActivityReport,
}

const hiveActivityReportSelectors = {
  isLoading,
  employeeHiveActivityReport,
  managerHiveActivityReport,
  selectedDate,
  selectedView,
  managerReportSize,
  monthDisplay,
}

export const hiveActivityReportService = {
  ...hiveActivityReportThunk,
  actions: hiveActivityReportSlice.actions,
  selectors: hiveActivityReportSelectors,
}

export default hiveActivityReportSlice.reducer
