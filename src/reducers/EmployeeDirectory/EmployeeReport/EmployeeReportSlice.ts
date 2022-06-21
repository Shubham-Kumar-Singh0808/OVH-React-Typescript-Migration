import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { RootState } from '../../../stateStore'
import {
  EmployeeTable,
  EmployeeReportApiProps,
  EmployeeReportSliceState,
  EmploymentStatus,
} from '../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import employeeReportApi from '../../../middleware/api/EmployeeDirectory/EmployeeReport/employeeReportApi'

const getEmployeeReport = createAsyncThunk(
  'category/getEmployeeReports',
  async (props: EmployeeReportApiProps, thunkApi) => {
    try {
      return await employeeReportApi.getEmployeeReport(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEmployeeReportState: EmployeeReportSliceState = {
  employees: [],
  selectedEmploymentStatus: EmploymentStatus.active,
  listSize: 0,
  isLoading: ApiLoadingState.idle,
}

const employeeReportSlice = createSlice({
  name: 'employeeReport',
  initialState: initialEmployeeReportState,
  reducers: {
    clearEmployeeList: (state) => {
      state.employees = []
    },
    changeSelectedEmploymentStatus: (state, action) => {
      state.selectedEmploymentStatus = action.payload as EmploymentStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getEmployeeReport.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getEmployeeReport.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employees = action.payload.emps as EmployeeTable[]
        state.listSize = action.payload.Empsize
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeReport.isLoading
const employeesReport = (state: RootState): EmployeeTable[] =>
  state.employeeReport.employees
const listSize = (state: RootState): number => state.employeeReport.listSize
const selectedEmploymentStatus = (state: RootState): EmploymentStatus =>
  state.employeeReport.selectedEmploymentStatus

const employeeReportsThunk = {
  getEmployeeReport,
}

const employeeReportSelectors = {
  isLoading,
  employeesReport,
  listSize,
  selectedEmploymentStatus,
}

export const employeeReportService = {
  ...employeeReportsThunk,
  actions: employeeReportSlice.actions,
  selectors: employeeReportSelectors,
}

export default employeeReportSlice.reducer
