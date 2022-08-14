import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import AddProject from '../../../middleware/api/ProjectManagement/Projects/AddProject'
import {
  ProjectClients,
  ProjectDetail,
  ProjectsManagementSliceState,
} from '../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'

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
    return await AddProject.addProject(payload)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getProjectClients = createAsyncThunk(
  'projectManagement/getProjectClients',
  async (_, thunkApi) => {
    try {
      return await AddProject.getProjectClients()
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
      .addMatcher(
        isAnyOf(getProjectClients.pending, addProject.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getProjectClients.fulfilled, addProject.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(getProjectClients.rejected, addProject.rejected),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const projectClients = (state: RootState): ProjectClients[] =>
  state.projectManagement.projectClients

const isLoading = (state: RootState): LoadingState =>
  state.projectManagement.isLoading

const projectsThunk = {
  addProject,
  getProjectClients,
}

const projectsSelectors = {
  isLoading,
  projectClients,
}

export const projectManagementService = {
  ...projectsThunk,
  actions: projectsManagementSlice.actions,
  selectors: projectsSelectors,
}

export default projectsManagementSlice.reducer
