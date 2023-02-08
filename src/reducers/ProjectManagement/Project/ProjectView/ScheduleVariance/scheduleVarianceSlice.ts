import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import projectScheduleVarianceApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/ScheduleVariance/scheduleVarianceApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
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
  'projectProposals/getProjectTimeLine',
  async (projectId: number | string, thunkApi) => {
    try {
      return await projectScheduleVarianceApi.getScheduleVariance(projectId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProjectScheduleVarianceState: ProjectScheduleVarianceState = {
  projectScheduleVariance: [],
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
      .addCase(getScheduleVariance.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const projectScheduleVarianceThunk = {
  getScheduleVariance,
}
const isProjectScheduleVarianceLoading = (state: RootState): LoadingState =>
  state.scheduleVariance.isLoading

const projectScheduleVariance = (state: RootState): ProjectScheduleVariance[] =>
  state.scheduleVariance.projectScheduleVariance

const projectScheduleVarianceSelectors = {
  isProjectScheduleVarianceLoading,
  projectScheduleVariance,
}

export const projectScheduleVarianceService = {
  ...projectScheduleVarianceThunk,
  actions: projectScheduleVarianceSlice.actions,
  selectors: projectScheduleVarianceSelectors,
}

export default projectScheduleVarianceSlice.reducer
