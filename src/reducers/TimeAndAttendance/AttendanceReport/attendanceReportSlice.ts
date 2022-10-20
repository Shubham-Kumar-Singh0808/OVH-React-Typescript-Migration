import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import moment from 'moment'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import attendanceReportApi from '../../../middleware/api/TimeAndAttendance/AttendanceReport/attendanceReportApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeeAttendanceReportApiProps,
  EmployeeAttendanceReportSliceState,
  EmployeeDetailsWithAttendanceReport,
} from '../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'

// fetch employee attendance report action creator
const getEmployeeAttendanceReport = createAsyncThunk(
  'attendanceReport/getEmployeeAttendanceReport',
  async (props: EmployeeAttendanceReportApiProps, thunkApi) => {
    try {
      return await attendanceReportApi.getEmployeeAttendanceReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEmployeeAttendanceReportState: EmployeeAttendanceReportSliceState =
  {
    size: 0,
    days: [],
    employeeAttendanceReport: [],
    isLoading: ApiLoadingState.idle,
    monthDisplay: moment(new Date()).format('MMMM-YYYY'),
  }

const attendanceReportSlice = createSlice({
  name: 'attendanceReport',
  initialState: initialEmployeeAttendanceReportState,
  reducers: {
    setMonthDisplay: (state, action) => {
      state.monthDisplay = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeAttendanceReport.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeAttendanceReport = action.payload.list
        state.days = action.payload.days
        state.size = action.payload.size
      })
      .addMatcher(isAnyOf(getEmployeeAttendanceReport.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const employeeAttendanceReport = (
  state: RootState,
): EmployeeDetailsWithAttendanceReport[] =>
  state.employeeAttendanceReport.employeeAttendanceReport

const listSize = (state: RootState): number =>
  state.employeeAttendanceReport.size

const isLoading = (state: RootState): LoadingState =>
  state.employeeAttendanceReport.isLoading

const days = (state: RootState): number[] => state.employeeAttendanceReport.days

const monthDisplay = (state: RootState): string =>
  state.employeeAttendanceReport.monthDisplay

const attendanceReportThunk = {
  getEmployeeAttendanceReport,
}

const attendanceReportSelectors = {
  employeeAttendanceReport,
  listSize,
  isLoading,
  days,
  monthDisplay,
}

export const attendanceReportService = {
  ...attendanceReportThunk,
  actions: attendanceReportSlice.actions,
  selectors: attendanceReportSelectors,
}

export default attendanceReportSlice.reducer
