import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import appraisalConfigurationsApi from '../../../middleware/api/Settings/Configurations/appraisalConfigurationsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AppraisalCycleSliceState,
  GetAppraisalCycle,
  GetCycle,
} from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'

const getAppraisalCycle = createAsyncThunk(
  'appraisalConfigurations/getAllAppraisalCycle',
  async (_, thunkApi) => {
    try {
      return await appraisalConfigurationsApi.getAppraisalCycle()
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
  async (updateCycleDetails: GetCycle, thunkApi) => {
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
  async (validateCycleDetails: GetCycle, thunkApi) => {
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
  editAppraisalCycle: {} as GetCycle,
  isLoading: ApiLoadingState.idle,
  error: null,
  listSize: 0,
}

const appraisalCycleSlice = createSlice({
  name: 'appraisalCycle',
  initialState: initialAppraisalCycleSliceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCycleToEdit.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editAppraisalCycle = action.payload as GetCycle
      })
      .addCase(getAppraisalCycle.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.appraisalCycle = action.payload
      })
      .addMatcher(
        isAnyOf(
          getAppraisalCycle.pending,
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
          updateAppraisalCycle.fulfilled,
          validateAppraisalCycle.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getCycleToEdit.rejected,
          getAppraisalCycle.rejected,
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

const appraisalCycle = (state: RootState): GetAppraisalCycle[] =>
  state.appraisalConfigurations.appraisalCycle

const isLoading = (state: RootState): LoadingState =>
  state.appraisalConfigurations.isLoading

const getEditAppraisal = (state: RootState): GetAppraisalCycle =>
  state.appraisalConfigurations.editAppraisalCycle

const selectError = (state: RootState): ValidationError =>
  state.appraisalConfigurations.error

const listSize = (state: RootState): number =>
  state.appraisalConfigurations.listSize

const appraisalCycleThunk = {
  getAppraisalCycle,
  getCycleToEdit,
  updateAppraisalCycle,
  validateAppraisalCycle,
}

const appraisalCycleSelectors = {
  isLoading,
  appraisalCycle,
  getEditAppraisal,
  selectError,
  listSize,
}

export const appraisalCycleService = {
  ...appraisalCycleThunk,
  actions: appraisalCycleSlice.actions,
  selectors: appraisalCycleSelectors,
}

export default appraisalCycleSlice.reducer
