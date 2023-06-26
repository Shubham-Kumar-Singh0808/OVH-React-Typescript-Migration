import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import moment from 'moment'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import timeInOfficeReportApi from '../../../middleware/api/TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetTimeInOfficeEmployeeReportProps,
  GetTimeInOfficeEmployeeReportResponse,
  GetTimeInOfficeManagerReportResponse,
  GetTimeInOfficeProps,
  SearchResultResponse,
  SelectedView,
  TimeInOfficeReportSliceState,
} from '../../../types/TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportTypes'

const getTimeInOfficeEmployeeReport = createAsyncThunk(
  'timeInOfficeReport/getTimeInOfficeEmployeeReport',
  async (props: GetTimeInOfficeEmployeeReportProps, thunkApi) => {
    try {
      return await timeInOfficeReportApi.getTimeInOfficeEmployeeReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getTimeInOfficeManagerReport = createAsyncThunk(
  'timeInOfficeReport/getTimeInOfficeManagerReport',
  async (props: GetTimeInOfficeEmployeeReportProps, thunkApi) => {
    try {
      return await timeInOfficeReportApi.getTimeInOfficeManagerReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const searchTimeInOffice = createAsyncThunk(
  'timeInOfficeReport/searchTimeInOffice',
  async (props: GetTimeInOfficeProps, thunkApi) => {
    try {
      return await timeInOfficeReportApi.searchTimeInOffice(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialTimeInOfficeReportSliceState: TimeInOfficeReportSliceState = {
  selectedDate: moment().subtract(1, 'months').format('M/YYYY'),
  selectedView: 'Me',
  timeInOfficeManagerReport: { dayList: [], list: [], size: 0 },
  timeInOfficeEmployeeReport: {
    empID: '',
    empName: '',
    dayList: [],
    inOfficeDTOs: [],
  },
  isLoading: ApiLoadingState.idle,
  monthDisplay: moment(new Date()).format('MMMM-YYYY'),
  searchResult: {} as SearchResultResponse,
}

const timeInOfficeReportSlice = createSlice({
  name: 'timeInOfficeReport',
  initialState: initialTimeInOfficeReportSliceState,
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
      .addCase(getTimeInOfficeManagerReport.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.timeInOfficeManagerReport = action.payload
      })
      .addCase(searchTimeInOffice.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.searchResult = action.payload
      })
      .addMatcher(
        isAnyOf(
          getTimeInOfficeEmployeeReport.pending,
          getTimeInOfficeManagerReport.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getTimeInOfficeEmployeeReport.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.timeInOfficeEmployeeReport = action.payload
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.timeInOfficeReport.isLoading
const timeInOfficeEmployeeReport = (
  state: RootState,
): GetTimeInOfficeEmployeeReportResponse =>
  state.timeInOfficeReport.timeInOfficeEmployeeReport
const timeInOfficeManagerReport = (
  state: RootState,
): GetTimeInOfficeManagerReportResponse =>
  state.timeInOfficeReport.timeInOfficeManagerReport
const selectedDate = (state: RootState): string =>
  state.timeInOfficeReport.selectedDate
const selectedView = (state: RootState): SelectedView =>
  state.timeInOfficeReport.selectedView
const managerReportSize = (state: RootState): number =>
  state.timeInOfficeReport.timeInOfficeManagerReport.size
const monthDisplay = (state: RootState): string =>
  state.timeInOfficeReport.monthDisplay

const timeInOfficeReportThunk = {
  getTimeInOfficeEmployeeReport,
  getTimeInOfficeManagerReport,
  searchTimeInOffice,
}

const timeInOfficeReportSelectors = {
  timeInOfficeEmployeeReport,
  timeInOfficeManagerReport,
  isLoading,
  selectedDate,
  selectedView,
  managerReportSize,
  monthDisplay,
}

export const timeInOfficeReportService = {
  ...timeInOfficeReportThunk,
  actions: timeInOfficeReportSlice.actions,
  selectors: timeInOfficeReportSelectors,
}

export default timeInOfficeReportSlice.reducer
