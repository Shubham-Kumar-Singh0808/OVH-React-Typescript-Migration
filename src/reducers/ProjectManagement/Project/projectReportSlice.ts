import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  ProjectDetails,
  ProjectReportQueryParams,
  ProjectsReportSliceState,
} from '../../../types/ProjectManagement/Project/ProjectTypes'
import ProjectApi from '../../../middleware/api/ProjectManagement/Project'

const initialProjectsState = {} as ProjectsReportSliceState

const getFetchActiveProjectReports = createAsyncThunk<
  ProjectDetails,
  ProjectReportQueryParams,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectReports/getFetchActiveProjectReports',
  async (queryParams: ProjectReportQueryParams, thunkApi) => {
    try {
      return await ProjectApi.getActiveProjectReports(queryParams)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getFetchSearchAllocationReport = createAsyncThunk<
  ProjectDetails,
  ProjectReportQueryParams,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectReports/getFetchSearchAllocationReport',
  async (queryParams: ProjectReportQueryParams, thunkApi) => {
    try {
      return await ProjectApi.getSearchAllocationReport(queryParams)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const projectReportsSlice = createSlice({
  name: 'projectReports',
  initialState: initialProjectsState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFetchActiveProjectReports.fulfilled, (state, action) => {
        state.ProjectDetails = action.payload
      })
      .addCase(getFetchSearchAllocationReport.fulfilled, (state, action) => {
        state.ProjectDetails = action.payload
      })
      .addMatcher(
        isAnyOf(
          getFetchActiveProjectReports.pending,
          getFetchSearchAllocationReport.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getFetchActiveProjectReports.fulfilled,
          getFetchSearchAllocationReport.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getFetchActiveProjectReports.rejected,
          getFetchSearchAllocationReport.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const projectReports = (state: RootState): ProjectDetails =>
  state.projectReport.ProjectDetails

const isLoading = (state: RootState): LoadingState =>
  state.projectReport.isLoading

const projectsThunk = {
  getFetchActiveProjectReports,
  getFetchSearchAllocationReport,
}

const projectsSelectors = {
  isLoading,
  projectReports,
}

export const projectReportsService = {
  ...projectsThunk,
  actions: projectReportsSlice.actions,
  selectors: projectsSelectors,
}

export default projectReportsSlice.reducer
