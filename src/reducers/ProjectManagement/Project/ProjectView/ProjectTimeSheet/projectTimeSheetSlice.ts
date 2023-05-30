import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import projectTimeSheetApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/ProjectTimeSheet/projectTimeSheetApi'
import { RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  EmployeeTimeSheet,
  ProjectHiveActivityReportSlice,
  ProjectTimeSheetProps,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTimeSheet/projectTimeSheetTypes'
import { EmployeeHiveReport } from '../../../../../types/TimeAndAttendance/HiveActivityReport/hiveActivityReportTypes'

const getProjectTimeSheet = createAsyncThunk(
  'projectView/getProjectTimeSheet',
  async (props: ProjectTimeSheetProps, thunkApi) => {
    try {
      return await projectTimeSheetApi.getProjectTimeSheet(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialHiveActivityReportSliceState: ProjectHiveActivityReportSlice = {
  employeeHiveActivityReport: [],
  isLoading: ApiLoadingState.idle,
}

const projectHiveActivityReportSlice = createSlice({
  name: 'projectView',
  initialState: initialHiveActivityReportSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectTimeSheet.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeHiveActivityReport = action.payload
    })
    builder.addCase(getProjectTimeSheet.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectTimeSheet.isLoading
const employeeHiveActivityReport = (state: RootState): EmployeeHiveReport[] =>
  state.projectTimeSheet.employeeHiveActivityReport

const projectHiveActivityReportThunk = {
  getProjectTimeSheet,
}

const ProjectHiveActivityReportSelectors = {
  isLoading,
  employeeHiveActivityReport,
}

export const projectHiveActivityReportService = {
  ...projectHiveActivityReportThunk,
  actions: projectHiveActivityReportSlice.actions,
  selectors: ProjectHiveActivityReportSelectors,
}

export default projectHiveActivityReportSlice.reducer
