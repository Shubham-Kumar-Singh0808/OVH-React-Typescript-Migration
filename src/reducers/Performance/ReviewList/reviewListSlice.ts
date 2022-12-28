import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reviewListApi } from '../../../middleware/api/Performance/ReviewList/reviewListApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmpDepartments,
  ReviewListSliceState,
} from '../../../types/Performance/ReviewList/reviewListTypes'

const initialReviewListState: ReviewListSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  employeeDepartments: [],
}

const getEmployeeDepartments = createAsyncThunk(
  'reviewList/getEmployeeDepartments',
  async (_, thunkApi) => {
    try {
      return await reviewListApi.getEmployeeDepartments()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const reviewListSlice = createSlice({
  name: 'reviewList',
  initialState: initialReviewListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeDepartments.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeDepartments = action.payload
      })
      .addMatcher(isAnyOf(getEmployeeDepartments.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getEmployeeDepartments.rejected), (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState => state.reviewList.isLoading
const departments = (state: RootState): EmpDepartments[] =>
  state.reviewList.employeeDepartments

const reviewListThunk = {
  getEmployeeDepartments,
}

const reviewListSelectors = {
  isLoading,
  departments,
}

export const reviewListService = {
  ...reviewListThunk,
  actions: reviewListSlice.actions,
  selectors: reviewListSelectors,
}

export default reviewListSlice.reducer
