import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import AppraisalTemplateApi from '../../../middleware/api/Performance/AppraisalTemplate/AppraisalTemplateApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AppraisalTemplateSliceState,
  GetCycleList,
} from '../../../types/Performance/AppraisalTemplate/appraisalTemplateTypes'

const activeCycle = createAsyncThunk(
  'appraisalTemplate/activeCycle',
  async (_, thunkApi) => {
    try {
      return await AppraisalTemplateApi.activeCycle()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const cycle = createAsyncThunk(
  'appraisalTemplate/cycle',
  async (_, thunkApi) => {
    try {
      return await AppraisalTemplateApi.cycle()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialAppraisalTemplateState: AppraisalTemplateSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  listSize: 0,
  cycleList: [],
}

const appraisalTemplateSlice = createSlice({
  name: 'appraisalTemplate',
  initialState: initialAppraisalTemplateState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(activeCycle.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(cycle.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.cycleList = action.payload?.list
        state.listSize = action.payload?.size
      })
      .addMatcher(isAnyOf(activeCycle.pending, cycle.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(activeCycle.rejected, cycle.rejected), (state) => {
        state.isLoading = ApiLoadingState.failed
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.appraisalTemplate.isLoading

const listSize = (state: RootState): number => state.appraisalTemplate.listSize

const cycleList = (state: RootState): GetCycleList[] =>
  state.appraisalTemplate.cycleList

export const appraisalTemplateThunk = {
  activeCycle,
  cycle,
}

export const appraisalTemplateSelectors = {
  isLoading,
  listSize,
  cycleList,
}

export const appraisalTemplateService = {
  ...appraisalTemplateThunk,
  actions: appraisalTemplateSlice.actions,
  selectors: appraisalTemplateSelectors,
}

export default appraisalTemplateSlice.reducer
