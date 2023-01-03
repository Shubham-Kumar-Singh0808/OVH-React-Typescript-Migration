import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reviewListApi } from '../../../middleware/api/Performance/ReviewList/reviewListApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  Appraisal,
  AppraisalCycle,
  EmpDepartments,
  ReviewListData,
  ReviewListSliceState,
} from '../../../types/Performance/ReviewList/reviewListTypes'

const initialReviewListState: ReviewListSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  employeeDepartments: [],
  appraisal: [],
  listSize: 0,
  appraisalCycle: [],
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

const getAppraisalCycles = createAsyncThunk(
  'reviewList/getAppraisalCycles',
  async (_, thunkApi) => {
    try {
      return await reviewListApi.getAppraisalCycles()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getReviewList = createAsyncThunk(
  'reviewList/getReviewList',
  async (props: ReviewListData, thunkApi) => {
    try {
      return await reviewListApi.getReviewList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const reviewListSlice = createSlice({
  name: 'reviewList',
  initialState: initialReviewListState,
  reducers: {
    clearReviewList: (state) => {
      state.appraisal = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeDepartments.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeDepartments = action.payload
      })
      .addCase(getAppraisalCycles.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.appraisalCycle = action.payload
      })
      .addCase(getReviewList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.appraisal = action.payload.list
        state.listSize = action.payload.size
      })
      .addMatcher(
        isAnyOf(
          getEmployeeDepartments.pending,
          getReviewList.pending,
          getAppraisalCycles.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeDepartments.rejected,
          getReviewList.rejected,
          getAppraisalCycles.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.reviewList.isLoading
const departments = (state: RootState): EmpDepartments[] =>
  state.reviewList.employeeDepartments
const appraisalCycles = (state: RootState): AppraisalCycle[] =>
  state.reviewList.appraisalCycle
const appraisalReviews = (state: RootState): Appraisal[] =>
  state.reviewList.appraisal
const listSize = (state: RootState): number => state.reviewList.listSize

const reviewListThunk = {
  getEmployeeDepartments,
  getReviewList,
  getAppraisalCycles,
}

const reviewListSelectors = {
  isLoading,
  departments,
  appraisalCycles,
  appraisalReviews,
  listSize,
}

export const reviewListService = {
  ...reviewListThunk,
  actions: reviewListSlice.actions,
  selectors: reviewListSelectors,
}

export default reviewListSlice.reducer
