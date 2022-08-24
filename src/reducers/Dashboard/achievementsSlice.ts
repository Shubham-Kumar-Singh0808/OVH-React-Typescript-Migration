import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import dashboardApi from '../../middleware/api/Dashboard/dashboardApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  AchievementsSliceState,
  ServiceAward,
} from '../../types/Dashboard/Achievements/achievementTypes'

const getAllAchievements = createAsyncThunk<
  ServiceAward[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('achievements/getAllAchievements', async (_, thunkApi) => {
  try {
    return await dashboardApi.getAllAchievements()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialAchievementsState: AchievementsSliceState = {
  serviceAwards: [],
  isLoading: ApiLoadingState.idle,
  error: null,
}
const achievementsSlice = createSlice({
  name: 'achievements',
  initialState: initialAchievementsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAchievements.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.serviceAwards = action.payload as ServiceAward[]
      })
      .addMatcher(isAnyOf(getAllAchievements.rejected), (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
      .addMatcher(isAnyOf(getAllAchievements.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.achievements.isLoading

const achievements = (state: RootState): ServiceAward[] =>
  state.achievements.serviceAwards

export const employeeAchievementsThunk = {
  getAllAchievements,
}

export const employeeAchievementsSelectors = {
  isLoading,
  achievements,
}

export const employeeAchievementsService = {
  ...employeeAchievementsThunk,
  actions: achievementsSlice.actions,
  selectors: employeeAchievementsSelectors,
}

export default achievementsSlice.reducer
