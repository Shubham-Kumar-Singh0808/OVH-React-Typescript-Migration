import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import projectScheduleVarianceApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/ScheduleVariance/scheduleVarianceApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  ProjectOverAllScheduleVariance,
  ProjectScheduleVariance,
  ProjectScheduleVarianceState,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ScheduleVariance/scheduleVarianceTypes'

const getScheduleVariance = createAsyncThunk<
  ProjectScheduleVariance[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectView/getScheduleVariance',
  async (projectId: number | string, thunkApi) => {
    try {
      return await projectScheduleVarianceApi.getScheduleVariance(projectId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getOverAllScheduleVariance = createAsyncThunk<
  ProjectOverAllScheduleVariance[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectProposals/getProjectTimeLine',
  async (projectId: number | string, thunkApi) => {
    try {
      return await projectScheduleVarianceApi.getOverAllScheduleVariance(
        projectId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProjectScheduleVarianceState: ProjectScheduleVarianceState = {
  projectScheduleVariance: [],
  projectOverAllScheduleVariance: [],
  isLoading: ApiLoadingState.idle,
}

const projectScheduleVarianceSlice = createSlice({
  name: 'projectView',
  initialState: initialProjectScheduleVarianceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScheduleVariance.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectScheduleVariance =
          action.payload as ProjectScheduleVariance[]
      })
      .addCase(getOverAllScheduleVariance.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectOverAllScheduleVariance =
          action.payload as ProjectOverAllScheduleVariance[]
      })
      .addCase(getScheduleVariance.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const projectScheduleVarianceThunk = {
  getScheduleVariance,
  getOverAllScheduleVariance,
}
const isProjectScheduleVarianceLoading = (state: RootState): LoadingState =>
  state.scheduleVariance.isLoading

const projectScheduleVariance = (state: RootState): ProjectScheduleVariance[] =>
  state.scheduleVariance.projectScheduleVariance

const projectOverallScheduleVariance = (
  state: RootState,
): ProjectOverAllScheduleVariance[] =>
  state.scheduleVariance.projectOverAllScheduleVariance

const projectScheduleVarianceSelectors = {
  isProjectScheduleVarianceLoading,
  projectScheduleVariance,
  projectOverallScheduleVariance,
}

export const projectScheduleVarianceService = {
  ...projectScheduleVarianceThunk,
  actions: projectScheduleVarianceSlice.actions,
  selectors: projectScheduleVarianceSelectors,
}

export default projectScheduleVarianceSlice.reducer
