import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import dashboardApi from '../../middleware/api/Dashboard/dashboardApi'
import earnedLeavesApi from '../../middleware/api/Dashboard/earnedLeavesApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  EarnedLeavesSliceState,
  LeaveSummary,
} from '../../types/Dashboard/EarnedLeaves/earnedLeavesTypes'

const getLeaveSummary = createAsyncThunk(
  'earnedLeaves/getLeaveSummary',
  async (_, thunkApi) => {
    try {
      return await earnedLeavesApi.getLeaveSummary()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getFinancialYear = createAsyncThunk<
  number | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('earnedLeaves/getFinancialYear', async (_, thunkApi) => {
  try {
    return await dashboardApi.getFinancialYear()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialEarnedLeavesState: EarnedLeavesSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  financialYear: 0,
  leaveSummary: {
    allAvailableLeaves: 0,
    allCancelAfterApprovalLeaves: 0,
    allCreditedLeaves: 0,
    allLOPPendingLeaves: 0,
    allLOPTakenLeaves: 0,
    allPendingLeaves: 0,
    allScheduledLeaves: 0,
    allTakenLeaves: 0,
    calculatedCreditedLeaves: 0,
    carryForwardedLeaves: 0,
    leaveCategorySummaries: [],
  },
}

const earnedLeavesSlice = createSlice({
  name: 'earnedLeaves',
  initialState: initialEarnedLeavesState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFinancialYear.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.financialYear = action.payload as number
      })
      .addCase(getLeaveSummary.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.leaveSummary = action.payload
      })
      .addMatcher(
        isAnyOf(getFinancialYear.pending, getLeaveSummary.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const earnedLeavesThunk = {
  getFinancialYear,
  getLeaveSummary,
}

const isLoading = (state: RootState): LoadingState =>
  state.earnedLeaves.isLoading

const financialYear = (state: RootState): number =>
  state.earnedLeaves.financialYear

const employeeLeaveSummary = (state: RootState): LeaveSummary =>
  state.earnedLeaves.leaveSummary

const earnedLeavesSelectors = {
  isLoading,
  financialYear,
  employeeLeaveSummary,
}

export const earnedLeavesService = {
  ...earnedLeavesThunk,
  actions: earnedLeavesSlice.actions,
  selectors: earnedLeavesSelectors,
}

export default earnedLeavesSlice.reducer
