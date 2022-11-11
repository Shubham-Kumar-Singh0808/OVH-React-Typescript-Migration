import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import appraisalConfigurationsApi from '../../../middleware/api/Settings/Configurations/appraisalConfigurationsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AppraisalCycleSliceState,
  getAppraisalCycle,
  getCycle,
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

const getCycleToEdit = createAsyncThunk(
  'appraisalCycle/getCycleToEdit',
  async (cycleId: number, thunkApi) => {
    try {
      return await appraisalConfigurationsApi.getCycleToEdit(cycleId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAppraisalCycleSliceState: AppraisalCycleSliceState = {
  appraisalCycle: [],
  editAppraisalCycle: {} as getCycle,
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
      .addCase(getCycleToEdit.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editAppraisalCycle = action.payload as getCycle
      })
      .addMatcher(
        isAnyOf(getAllAppraisalCycleData.pending, getCycleToEdit.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getAllAppraisalCycleData.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.appraisalCycle = action.payload
        },
      )
  },
})

const appraisalCycleNames = (state: RootState): getAppraisalCycle[] =>
  state.appraisalConfigurations.appraisalCycle

const isLoading = (state: RootState): LoadingState =>
  state.appraisalConfigurations.isLoading

const getEditAppraisal = (state: RootState): getAppraisalCycle =>
  state.appraisalConfigurations.editAppraisalCycle

const pageFromState = (state: RootState): number =>
  state.appraisalConfigurations.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.appraisalConfigurations.pageSize

const appraisalCycleThunk = {
  getAllAppraisalCycle: getAllAppraisalCycleData,
  getCycleToEdit,
}

const appraisalCycleSelectors = {
  isLoading,
  appraisalCycleNames,
  pageFromState,
  pageSizeFromState,
  getEditAppraisal,
}

export const appraisalCycleService = {
  ...appraisalCycleThunk,
  actions: appraisalCycleSlice.actions,
  selectors: appraisalCycleSelectors,
}

export default appraisalCycleSlice.reducer
