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

const updateAppraisalCycle = createAsyncThunk(
  'appraisalCycle/updateAppraisalCycle',
  async (updateCycleDetails: getCycle, thunkApi) => {
    try {
      return await appraisalConfigurationsApi.updateAppraisalCycle(
        updateCycleDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const validateAppraisalCycle = createAsyncThunk(
  'appraisalCycle/updateAppraisalCycle',
  async (validateCycleDetails: getCycle, thunkApi) => {
    try {
      return await appraisalConfigurationsApi.validateAppraisalCycle(
        validateCycleDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialAppraisalCycleSliceState: AppraisalCycleSliceState = {
  appraisalCycle: [],
  editAppraisalCycle: {} as getCycle,
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
  error: null,
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
        isAnyOf(
          getAllAppraisalCycleData.pending,
          getCycleToEdit.pending,
          updateAppraisalCycle.pending,
          validateAppraisalCycle.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getAllAppraisalCycleData.fulfilled,
          updateAppraisalCycle.fulfilled,
          validateAppraisalCycle.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(getAllAppraisalCycleData.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.appraisalCycle = action.payload
        },
      )
      .addMatcher(isAnyOf(getCycleToEdit.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editAppraisalCycle = action.payload
      })
      .addMatcher(
        isAnyOf(
          getCycleToEdit.rejected,
          getAllAppraisalCycleData.rejected,
          validateAppraisalCycle.rejected,
          updateAppraisalCycle.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
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

const selectError = (state: RootState): ValidationError =>
  state.appraisalConfigurations.error

const pageFromState = (state: RootState): number =>
  state.appraisalConfigurations.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.appraisalConfigurations.pageSize

const appraisalCycleThunk = {
  getAllAppraisalCycle: getAllAppraisalCycleData,
  getCycleToEdit,
  updateAppraisalCycle,
  validateAppraisalCycle,
}

const appraisalCycleSelectors = {
  isLoading,
  appraisalCycleNames,
  pageFromState,
  pageSizeFromState,
  getEditAppraisal,
  selectError,
}

export const appraisalCycleService = {
  ...appraisalCycleThunk,
  actions: appraisalCycleSlice.actions,
  selectors: appraisalCycleSelectors,
}

export default appraisalCycleSlice.reducer
