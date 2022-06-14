import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeReviews,
  ReviewsTabState as ReviewsState,
} from '../../../types/MyProfile/ReviewsTab/reviewsTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import reviewsApi from '../../../middleware/api/MyProfile/ReviewsTab/reviewsApi'

const initialReviewsState: ReviewsState = {
  employeeReviewDetails: [],
  isLoading: false,
  error: 0,
}

const getEmployeeReviews = createAsyncThunk<
  EmployeeReviews[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'reviewsTab/getEmployeeReviews',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await reviewsApi.getEmployeeReviews(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeReviewSlice = createSlice({
  name: 'reviewsTab',
  initialState: initialReviewsState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeReviews.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeReviewDetails = action.payload as EmployeeReviews[]
    })
    builder.addCase(getEmployeeReviews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployeeReviews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as ValidationError
    })
  },
})
const reviewDetails = (state: RootState): EmployeeReviews[] =>
  state.reviewDetails.employeeReviewDetails

export const reviewsThunk = {
  getEmployeeReviews,
}
export const reviewsSelectors = {
  reviewsDetails: reviewDetails,
}
export const reviewsService = {
  ...reviewsThunk,
  actions: employeeReviewSlice.actions,
  selectors: reviewsSelectors,
}
export default employeeReviewSlice.reducer
