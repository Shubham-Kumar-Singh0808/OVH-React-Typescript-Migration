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

const closeProjectReport = createAsyncThunk<
  number | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectReports/closeProjectReport', async (projectId: string, thunkApi) => {
  try {
    return await ProjectApi.closeProjectReport(projectId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

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

const deallocateProjectReport = createAsyncThunk<
  number | undefined,
  ProjectInfo,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectReports/deallocateProjectReport',
  async (projectDetails: ProjectInfo, thunkApi) => {
    try {
      return await ProjectApi.deallocateProjectReport(projectDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateProjectReport = createAsyncThunk<
  number | undefined,
  ProjectInfo,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectReports/updateProjectReport',
  async (projectDetails: ProjectInfo, thunkApi) => {
    try {
      return await ProjectApi.updateProjectReport(projectDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProjectsState = {
  listSize: 0,
  SelectValue: '',
  StatusValue: 'INPROGRESS',
  PricingModel: 'All',
  ProjectHealth: 'All',
  customFromValue: '',
  customToValue: '',
} as ProjectsReportSliceState

const projectReportsSlice = createSlice({
  name: 'projectReports',
  initialState: initialProjectsState,
  reducers: {
    setSelectValue: (state, action) => {
      state.SelectValue = action.payload
    },
    setStatusValue: (state, action) => {
      state.StatusValue = action.payload
    },
    setPricingModel: (state, action) => {
      state.PricingModel = action.payload
    },
    setProjectHealth: (state, action) => {
      state.ProjectHealth = action.payload
    },
    setCustomFromValue: (state, action) => {
      state.customFromValue = action.payload
    },
    setCustomToValue: (state, action) => {
      state.customToValue = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFetchProjectClients.fulfilled, (state, action) => {
        state.ClientProjects = action.payload
        state.isClientProjectLoading = ApiLoadingState.succeeded
        state.isProjectLoading = ApiLoadingState.succeeded
      })
      .addCase(getFetchProjectClients.pending, (state) => {
        state.isClientProjectLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(
          closeProjectReport.fulfilled,
          deleteProjectReport.fulfilled,
          deallocateProjectReport.fulfilled,
          updateProjectReport.fulfilled,
        ),
        (state) => {
          state.isProjectLoading = ApiLoadingState.succeeded
        },
      )
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
          closeProjectReport.pending,
          deleteProjectReport.pending,
          deallocateProjectReport.pending,
        ),
        (state) => {
          state.isProjectLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getFetchActiveProjectReports.rejected,
          getFetchSearchAllocationReport.rejected,
          getFetchProjectClients.rejected,
          closeProjectReport.rejected,
          deleteProjectReport.rejected,
          deallocateProjectReport.rejected,
          updateProjectReport.rejected,
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

const getSelectValue = (state: RootState): string | undefined =>
  state.projectReport.SelectValue

const getStatusValue = (state: RootState): string | undefined =>
  state.projectReport.StatusValue

const getPricingModel = (state: RootState): string | undefined =>
  state.projectReport.PricingModel

const getProjectHealth = (state: RootState): string | undefined =>
  state.projectReport.ProjectHealth

const getCustomFromValue = (state: RootState): string | Date =>
  state.projectReport.customFromValue

const getCustomToValue = (state: RootState): string | Date =>
  state.projectReport.customToValue

const projectsThunk = {
  closeProjectReport,
  deallocateProjectReport,
  deleteProjectReport,
  getFetchActiveProjectReports,
  getFetchSearchAllocationReport,
  getFetchProjectClients,
  updateProjectReport,
}

const projectsSelectors = {
  isProjectLoading,
  isClientProjectLoading,
  projectClients,
  projectReports,
  listSize,
  getSelectValue,
  getStatusValue,
  getPricingModel,
  getProjectHealth,
  getCustomFromValue,
  getCustomToValue,
}

export const projectReportsService = {
  ...projectsThunk,
  actions: projectReportsSlice.actions,
  selectors: projectsSelectors,
}

export default projectReportsSlice.reducer
