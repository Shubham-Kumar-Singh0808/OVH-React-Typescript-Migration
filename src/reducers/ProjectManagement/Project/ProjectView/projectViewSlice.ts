import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import projectDetailsApi from '../../../../middleware/api/ProjectManagement/Projects/ProjectView/projectViewApi'
import { AppDispatch, RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  ProjectDetail,
  ProjectViewDetails,
  ProjectViewDetailsState,
  UpdateProjectViewDetails,
} from '../../../../types/ProjectManagement/Project/ProjectView/projectViewTypes'

const getProjectDetails = createAsyncThunk<
  ProjectViewDetails[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('Projects/getProjectDetails', async (projectId: number, thunkApi) => {
  try {
    return await projectDetailsApi.getProjectDetails(projectId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getProject = createAsyncThunk<
  ProjectDetail | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('Projects/getProject', async (projectid: number, thunkApi) => {
  try {
    return await projectDetailsApi.getProject(projectid)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const updateEmployeeAllocationProject = createAsyncThunk<
  number | undefined,
  UpdateProjectViewDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeAllocation/updateEmployeeAllocationProject',
  async (updateEmployeeAllocation: UpdateProjectViewDetails, thunkApi) => {
    try {
      return await projectDetailsApi.updateEmployeeAllocationProject(
        updateEmployeeAllocation,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProjectDetailsState: ProjectViewDetailsState = {
  projectViewDetails: [],
  isLoading: ApiLoadingState.idle,
  projectDetail: {} as ProjectDetail,
}

const projectDetailsSlice = createSlice({
  name: 'projects',
  initialState: initialProjectDetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectDetails.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.projectViewDetails = action.payload as ProjectViewDetails[]
    })
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.projectDetail = action.payload as ProjectDetail
    })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectViewDetails.isLoading

const projectViewDetails = (state: RootState): ProjectViewDetails[] =>
  state.projectViewDetails.projectViewDetails

const projectDetail = (state: RootState): ProjectDetail =>
  state.projectViewDetails.projectDetail

const projectViewThunk = {
  getProjectDetails,
  getProject,
  updateEmployeeAllocationProject,
}
const projectsViewSelectors = {
  isLoading,
  projectViewDetails,
  projectDetail,
}

export const projectViewService = {
  ...projectViewThunk,
  actions: projectDetailsSlice.actions,
  selectors: projectsViewSelectors,
}

export default projectDetailsSlice.reducer
