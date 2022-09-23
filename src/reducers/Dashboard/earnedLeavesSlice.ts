import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import dashboardApi from '../../middleware/api/Dashboard/dashboardApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import { EarnedLeavesSliceState } from '../../types/Dashboard/EarnedLeaves/earnedLeavesTypes'

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
      .addCase(getFinancialYear.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const earnedLeavesThunk = {
  getFinancialYear,
}

const isLoading = (state: RootState): LoadingState =>
  state.earnedLeaves.isLoading

const financialYear = (state: RootState): number =>
  state.earnedLeaves.financialYear

const earnedLeavesSelectors = {
  isLoading,
  financialYear,
}

export const earnedLeavesService = {
  ...earnedLeavesThunk,
  actions: earnedLeavesSlice.actions,
  selectors: earnedLeavesSelectors,
}

export default earnedLeavesSlice.reducer
