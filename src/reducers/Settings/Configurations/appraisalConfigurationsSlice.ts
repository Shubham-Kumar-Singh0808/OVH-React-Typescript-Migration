import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import appraisalConfigurationsApi from '../../../middleware/api/Settings/Configurations/appraisalConfigurationsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AppraisalCycleSliceState,
  getAppraisalCycle,
} from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'

const getAllAppraisalCycleData = createAsyncThunk(
  'appraisalConfigurations/getAllAppraisalCycle',
  async (_, thunkApi) => {
    try {
      return await appraisalConfigurationsApi.getAllAppraisalCycle()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialAppraisalCycleSliceState: AppraisalCycleSliceState = {
  appraisalCycle: [],
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const appraisalCycleSlice = createSlice({
  name: 'appraisalCycle',
  initialState: initialAppraisalCycleSliceState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers(builder) {
    builder

      .addMatcher(isAnyOf(getAllAppraisalCycleData.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(getAllAppraisalCycleData.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.appraisalCycle = action.payload as getAppraisalCycle[]
        },
      )
  },
})

const appraisalCycleNames = (state: RootState): getAppraisalCycle[] =>
  state.appraisalConfigurations.appraisalCycle

const isLoading = (state: RootState): LoadingState =>
  state.appraisalConfigurations.isLoading

const pageFromState = (state: RootState): number =>
  state.appraisalConfigurations.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.appraisalConfigurations.pageSize

const appraisalCycleThunk = {
  getAllAppraisalCycle: getAllAppraisalCycleData,
}

const appraisalCycleSelectors = {
  isLoading,
  appraisalCycleNames,
  pageFromState,
  pageSizeFromState,
}

export const appraisalCycleService = {
  ...appraisalCycleThunk,
  actions: appraisalCycleSlice.actions,
  selectors: appraisalCycleSelectors,
}

export default appraisalCycleSlice.reducer
