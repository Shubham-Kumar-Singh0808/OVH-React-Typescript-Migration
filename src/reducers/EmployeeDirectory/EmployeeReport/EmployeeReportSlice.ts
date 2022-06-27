import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { RootState } from '../../../stateStore'
import {
  EmployeeReport,
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
  country: '',
  selectedCategory: '',
  searchEmployee: '',
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
    changeSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload as string
    },
    setSearchEmployee: (state, action) => {
      state.searchEmployee = action.payload as string
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getEmployeeReport.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getEmployeeReport.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employees = action.payload.emps as EmployeeReport[]
        state.listSize = action.payload.Empsize
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeReport.isLoading
const employeesReport = (state: RootState): EmployeeReport[] =>
  state.employeeReport.employees
const listSize = (state: RootState): number => state.employeeReport.listSize
const selectedEmploymentStatus = (state: RootState): EmploymentStatus =>
  state.employeeReport.selectedEmploymentStatus
const selectedCategory = (state: RootState): string =>
  state.employeeReport.selectedCategory
const searchEmployee = (state: RootState): string =>
  state.employeeReport.searchEmployee

const employeeReportsThunk = {
  getEmployeeReport,
}

const employeeReportSelectors = {
  isLoading,
  employeesReport,
  listSize,
  selectedEmploymentStatus,
  selectedCategory,
  searchEmployee,
}

export const employeeReportService = {
  ...employeeReportsThunk,
  actions: employeeReportSlice.actions,
  selectors: employeeReportSelectors,
}

export default employeeReportSlice.reducer
