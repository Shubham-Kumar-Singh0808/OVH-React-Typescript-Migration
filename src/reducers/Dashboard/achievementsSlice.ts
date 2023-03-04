import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import achievementsApi from '../../middleware/api/Dashboard/achievementsApi'
import dashboardApi from '../../middleware/api/Dashboard/dashboardApi'
import { RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  AchievementsSliceState,
  EmployeeAchievementsApiResponse,
} from '../../types/Dashboard/Achievements/ServiceAwards/achievementsTypes'

const getAllAchievements = createAsyncThunk(
  'achievements/getAllAchievements',
  async (_, thunkApi) => {
    try {
      return await achievementsApi.getAllAchievements()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const imageFix = createAsyncThunk(
  'achievements/imageFix',
  async (_, thunkApi) => {
    try {
      return await dashboardApi.imageFix()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAchievementsState: AchievementsSliceState = {
  achievementsData: {} as EmployeeAchievementsApiResponse,
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
        state.achievementsData = action.payload
      })
      .addCase(imageFix.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
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

const achievements = (state: RootState): EmployeeAchievementsApiResponse =>
  state.achievements.achievementsData

export const employeeAchievementsThunk = {
  getAllAchievements,
  imageFix,
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
