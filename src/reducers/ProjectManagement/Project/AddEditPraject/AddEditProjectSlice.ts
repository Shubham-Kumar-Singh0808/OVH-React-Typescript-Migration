import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import ProjectApi from '../../../../middleware/api/ProjectManagement/Project'
import {
  Domains,
  Managers,
  PlatForms,
  Project,
  ProjectClients,
  ProjectDetail,
  ProjectsManagementSliceState,
} from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'

const initialProjectsState = {} as ProjectsManagementSliceState

const addProject = createAsyncThunk<
  ProjectDetail,
  ProjectDetail,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectManagement/addProject', async (payload: ProjectDetail, thunkApi) => {
  try {
    return await ProjectApi.addProject(payload)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const updateProject = createAsyncThunk<
  Project,
  Project,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectManagement/updateProject',
  async (projectDetails: Project, thunkApi) => {
    try {
      return await ProjectApi.updateProject(projectDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProject = createAsyncThunk<
  Project,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectManagement/getProject', async (projectId: string, thunkApi) => {
  try {
    return await ProjectApi.getProject(projectId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getProjectClients = createAsyncThunk(
  'projectManagement/getProjectClients',
  async (_, thunkApi) => {
    try {
      return await ProjectApi.getProjectClients()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllPlatforms = createAsyncThunk(
  'projectManagement/getAllPlatforms',
  async (_, thunkApi) => {
    try {
      return await ProjectApi.getAllPlatforms()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllDomains = createAsyncThunk(
  'projectManagement/getAllDomains',
  async (_, thunkApi) => {
    try {
      return await ProjectApi.getAllDomains()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllManagers = createAsyncThunk(
  'projectManagement/getAllManagers',
  async (_, thunkApi) => {
    try {
      return await ProjectApi.getAllManagers()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const projectsManagementSlice = createSlice({
  name: 'projectsManagement',
  initialState: initialProjectsState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProjectClients.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectClients = action.payload
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectDetail = action.payload
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.project = action.payload
      })
      .addCase(getAllPlatforms.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.platForms = action.payload
      })
      .addCase(getAllDomains.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.domains = action.payload
      })
      .addCase(getAllManagers.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.managers = action.payload
      })
      .addMatcher(
        isAnyOf(
          getProjectClients.pending,
          addProject.pending,
          getProject.pending,
          getAllPlatforms.pending,
          getAllDomains.pending,
          getAllManagers.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getProjectClients.fulfilled,
          addProject.fulfilled,
          getProject.fulfilled,
          getAllPlatforms.fulfilled,
          getAllDomains.fulfilled,
          getAllManagers.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getProjectClients.rejected,
          addProject.rejected,
          getProject.rejected,
          getAllPlatforms.rejected,
          getAllDomains.rejected,
          getAllManagers.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const projectClients = (state: RootState): ProjectClients[] =>
  state.projectManagement.projectClients

const project = (state: RootState): Project => state.projectManagement.project

const platForms = (state: RootState): PlatForms[] =>
  state.projectManagement.platForms
const domains = (state: RootState): Domains[] => state.projectManagement.domains
const managers = (state: RootState): Managers[] =>
  state.projectManagement.managers

const isLoading = (state: RootState): LoadingState =>
  state.projectManagement.isLoading

const projectsThunk = {
  addProject,
  updateProject,
  getProject,
  getProjectClients,
  getAllDomains,
  getAllPlatforms,
  getAllManagers,
}

const projectsSelectors = {
  isLoading,
  projectClients,
  project,
  platForms,
  domains,
  managers,
}

export const projectManagementService = {
  ...projectsThunk,
  actions: projectsManagementSlice.actions,
  selectors: projectsSelectors,
}

export default projectsManagementSlice.reducer
