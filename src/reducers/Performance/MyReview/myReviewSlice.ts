import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { myReviewApi } from '../../../middleware/api/Performance/MyReview/myReviewApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  MyReviewSliceState,
  PageDetails,
} from '../../../types/Performance/MyReview/myReviewTypes'

const initialMyReviewState: MyReviewSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  pageDetails: {
    country: null,
    departmentId: null,
    departmentName: null,
    description: '',
    displayOrder: 0,
    empCountry: '',
    handCountry: [],
    id: 0,
    pageName: '',
    sectionId: null,
    sectionName: null,
    title: '',
    type: '',
  },
}

const getEmployeePerformanceReview = createAsyncThunk<
  PageDetails | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('myReview/getEmployeePerformanceReview', async (_, thunkApi) => {
  try {
    return await myReviewApi.getEmployeePerformanceReview()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const myReviewSlice = createSlice({
  name: 'myReview',
  initialState: initialMyReviewState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeePerformanceReview.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.pageDetails = action.payload as PageDetails
      })
      .addMatcher(isAnyOf(getEmployeePerformanceReview.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(getEmployeePerformanceReview.rejected),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.itDeclarationList.isLoading
const reviewPage = (state: RootState): PageDetails => state.myReview.pageDetails
const myReviewThunk = {
  getEmployeePerformanceReview,
}

const myReviewSelectors = {
  isLoading,
  reviewPage,
}

export const myReviewService = {
  ...myReviewThunk,
  actions: myReviewSlice.actions,
  selectors: myReviewSelectors,
}

export default myReviewSlice.reducer
