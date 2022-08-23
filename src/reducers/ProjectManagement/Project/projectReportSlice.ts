import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  ProjectDetails,
  ProjectReport,
  ProjectReportQueryParams,
  ProjectsReportSliceState,
} from '../../../types/ProjectManagement/Project/ProjectTypes'
import { ProjectDetails as ProjectInfo } from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import ProjectApi from '../../../middleware/api/ProjectManagement/Project'

const initialProjectsState = {
  listSize: 0,
} as ProjectsReportSliceState

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

const getFetchProjectClients = createAsyncThunk<
  ProjectInfo[],
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectReports/getFetchProjectClients',
  async (projectId: string, thunkApi) => {
    try {
      return await ProjectApi.getClientProjects(projectId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteProjectReport = createAsyncThunk<
  number | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectReports/deleteProjectReport', async (projectId: string, thunkApi) => {
  try {
    return await ProjectApi.deleteProjectReport(projectId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const projectReportsSlice = createSlice({
  name: 'projectReports',
  initialState: initialProjectsState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFetchProjectClients.fulfilled, (state, action) => {
        state.ClientProjects = action.payload
        state.isClientProjectLoading = ApiLoadingState.succeeded
      })
      .addCase(deleteProjectReport.fulfilled, (state) => {
        state.isProjectLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(
          getFetchActiveProjectReports.fulfilled,
          getFetchSearchAllocationReport.fulfilled,
        ),
        (state, action) => {
          state.ProjectDetails = action.payload
          state.Clients = action.payload.Projs
          state.listSize = action.payload.Projsize
          state.isProjectLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getFetchActiveProjectReports.pending,
          getFetchSearchAllocationReport.pending,
          getFetchProjectClients.pending,
          deleteProjectReport.pending,
        ),
        (state) => {
          state.isProjectLoading = ApiLoadingState.loading
          state.isClientProjectLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getFetchActiveProjectReports.rejected,
          getFetchSearchAllocationReport.rejected,
          getFetchProjectClients.rejected,
          deleteProjectReport.rejected,
        ),
        (state, action) => {
          state.isProjectLoading = ApiLoadingState.failed
          state.isClientProjectLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const projectReports = (state: RootState): ProjectReport[] =>
  state.projectReport.Clients

const projectClients = (state: RootState): ProjectInfo[] =>
  state.projectReport.ClientProjects

const listSize = (state: RootState): number => state.projectReport.listSize

const isProjectLoading = (state: RootState): LoadingState =>
  state.projectReport.isProjectLoading

const isClientProjectLoading = (state: RootState): LoadingState =>
  state.projectReport.isClientProjectLoading

const projectsThunk = {
  deleteProjectReport,
  getFetchActiveProjectReports,
  getFetchSearchAllocationReport,
  getFetchProjectClients,
}

const projectsSelectors = {
  isProjectLoading,
  isClientProjectLoading,
  projectClients,
  projectReports,
  listSize,
}

export const projectReportsService = {
  ...projectsThunk,
  actions: projectReportsSlice.actions,
  selectors: projectsSelectors,
}

export default projectReportsSlice.reducer
