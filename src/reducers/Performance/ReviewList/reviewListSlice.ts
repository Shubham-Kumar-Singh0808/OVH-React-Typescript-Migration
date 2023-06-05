import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reviewListApi } from '../../../middleware/api/Performance/ReviewList/reviewListApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  ActiveCycle,
  AppraisalCycle,
  Designation,
  EmpDepartments,
  ReviewListData,
  ReviewListResponse,
  ReviewListSliceState,
} from '../../../types/Performance/ReviewList/reviewListTypes'

const initialReviewListState: ReviewListSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  employeeDepartments: [],
  appraisal: [],
  listSize: 0,
  appraisalCycle: [],
  designations: [],
  employeeReviewList: {
    list: [],
    size: 0,
  },
  activeCycle: {} as ActiveCycle,
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

const activeCycle = createAsyncThunk(
  'reviewList/activeCycle',
  async (_, thunkApi) => {
    try {
      return await reviewListApi.activeCycle()
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

const getDesignations = createAsyncThunk<
  Designation[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('supportManagement/getDesignations', async (departmentId, thunkApi) => {
  try {
    return await reviewListApi.getDesignations(departmentId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const reviewListSlice = createSlice({
  name: 'reviewList',
  initialState: initialReviewListState,
  reducers: {
    clearReviewList: (state) => {
      state.employeeReviewList = {
        list: [],
        size: 0,
      }
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
      .addCase(getDesignations.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.designations = action.payload as Designation[]
      })
      .addCase(getReviewList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeReviewList = action.payload
        state.listSize = action.payload.size
      })
      .addCase(activeCycle.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.activeCycle = action.payload
      })
      .addMatcher(
        isAnyOf(
          getEmployeeDepartments.pending,
          getReviewList.pending,
          getAppraisalCycles.pending,
          getDesignations.pending,
          activeCycle.pending,
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
          getDesignations.rejected,
          activeCycle.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.reviewList.isLoading
const isActiveCycle = (state: RootState): ActiveCycle =>
  state.reviewList.activeCycle
const departments = (state: RootState): EmpDepartments[] =>
  state.reviewList.employeeDepartments
const designations = (state: RootState): Designation[] =>
  state.reviewList.designations
const appraisalCycles = (state: RootState): AppraisalCycle[] =>
  state.reviewList.appraisalCycle
const appraisalReviews = (state: RootState): ReviewListResponse =>
  state.reviewList.employeeReviewList
const listSize = (state: RootState): number => state.reviewList.listSize

const reviewListThunk = {
  getEmployeeDepartments,
  getReviewList,
  getAppraisalCycles,
  getDesignations,
  activeCycle,
}

const reviewListSelectors = {
  isLoading,
  departments,
  appraisalCycles,
  appraisalReviews,
  listSize,
  designations,
  isActiveCycle,
}

export const reviewListService = {
  ...reviewListThunk,
  actions: reviewListSlice.actions,
  selectors: reviewListSelectors,
}

export default reviewListSlice.reducer
