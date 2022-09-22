import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import employeeAllocationReportApi from '../../../middleware/api/ProjectManagement/EmployeeAllocation/employeeAllocationApi'
import {
  EmployeeAllocationReportProps,
  EmployeeAllocationReportState,
  EmployeeAllocationReportType,
  GetEmployeeAllocationReport,
  ProjectUnderEmployees,
  ProjectUnderEmployeesProps,
  UpdateEmployeeAllocationProject,
} from '../../../types/ProjectManagement/EmployeeAllocation/employeeAllocationTypes'

const getEmployeeAllocationReport = createAsyncThunk(
  'employeeAllocation/getEmployeeAllocationReport',
  async (props: EmployeeAllocationReportProps, thunkApi) => {
    try {
      return await employeeAllocationReportApi.getEmployeeAllocationReport(
        props,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const projectUnderEmployeesReport = createAsyncThunk(
  'employeeAllocation/projectUnderEmployees',
  async (props: ProjectUnderEmployeesProps, thunkApi) => {
    try {
      return await employeeAllocationReportApi.projectUnderEmployeesReport(
        props,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const updateEmployeeAllocationProject = createAsyncThunk<
  number | undefined,
  UpdateEmployeeAllocationProject,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeAllocation/updateEmployeeAllocationProject',
  async (
    updateEmployeeAllocation: UpdateEmployeeAllocationProject,
    thunkApi,
  ) => {
    try {
      return await employeeAllocationReportApi.updateEmployeeAllocationProject(
        updateEmployeeAllocation,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEmployeeAllocationReportState: EmployeeAllocationReportState = {
  Empsize: 0,
  emps: [],
  projectUnderEmployees: [],
  isLoading: ApiLoadingState.idle,
  employeeAllocationReportType: {} as EmployeeAllocationReportType,
  error: null,
}
const employeeAllocationSlice = createSlice({
  name: 'employeeAllocation',
  initialState: initialEmployeeAllocationReportState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeAllocationReport.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.emps = action.payload.emps as GetEmployeeAllocationReport[]
    })
    builder.addCase(projectUnderEmployeesReport.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.projectUnderEmployees = action.payload as ProjectUnderEmployees[]
    })
    builder.addCase(getEmployeeAllocationReport.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const employeeAllocationReport = (
  state: RootState,
): EmployeeAllocationReportType =>
  state.employeeAllocationReport.employeeAllocationReportType

const employeeUnderProject = (state: RootState): ProjectUnderEmployees[] =>
  state.employeeAllocationReport.projectUnderEmployees

const isLoading = (state: RootState): LoadingState =>
  state.employeeAllocationReport.isLoading

const employeeMailConfigurationThunk = {
  getEmployeeAllocationReport,
  projectUnderEmployeesReport,
  updateEmployeeAllocationProject,
}

const employeeAllocationSelectors = {
  employeeAllocationReport,
  employeeUnderProject,
  isLoading,
}

export const employeeAllocationSliceService = {
  ...employeeMailConfigurationThunk,
  actions: employeeAllocationSlice.actions,
  selectors: employeeAllocationSelectors,
}

export default employeeAllocationSlice.reducer
