import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import appraisalConfigurationsApi from '../../../middleware/api/Settings/Configurations/appraisalConfigurationsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AppraisalCycleSliceState,
  getAppraisalCycle,
  GetAppraisalCycleProps,
} from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'

const getAllAppraisalCycleData = createAsyncThunk(
  'appraisalConfigurations/getAllAppraisalCycle',
  async (props: GetAppraisalCycleProps, thunkApi) => {
    try {
      return await appraisalConfigurationsApi.getAllAppraisalCycle(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const initialAppraisalCycleSliceState: AppraisalCycleSliceState = {
  isLoading: ApiLoadingState.idle,
  appraisalCycleList: { list: [], size: 0 },
}

const appraisalCycleSlice = createSlice({
  name: 'appraisalCycle',
  initialState: initialAppraisalCycleSliceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllAppraisalCycleData.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
      .addCase(getAllAppraisalCycleData.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(getAllAppraisalCycleData.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.appraisalCycleList = action.payload
        },
      )
  },
})

const appraisalCycleNames = (state: RootState): getAppraisalCycle[] =>
  state.appraisalConfigurations.appraisalCycleList?.list

const appraisalCycleListSize = (state: RootState): number =>
  state.appraisalConfigurations.appraisalCycleList?.size

const isLoading = (state: RootState): LoadingState =>
  state.appraisalConfigurations.isLoading

const appraisalCycleThunk = {
  getAllAppraisalCycleData,
}

const appraisalCycleSelectors = {
  isLoading,
  appraisalCycleNames,
  appraisalCycleListSize,
}

export const appraisalCycleService = {
  ...appraisalCycleThunk,
  actions: appraisalCycleSlice.actions,
  selectors: appraisalCycleSelectors,
}

export default appraisalCycleSlice.reducer
