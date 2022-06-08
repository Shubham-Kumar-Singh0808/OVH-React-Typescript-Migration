import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeReviews,
  ReviewsTabState,
} from '../../../types/MyProfile/ReviewsTab/reviewsTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import reviewsTabApi from '../../../middleware/api/MyProfile/ReviewsTab/reviewsApi'

const initialReviewsTabState: ReviewsTabState = {
  employeeReviewDetails: [],
  isLoading: false,
  error: 0,
}

const getEmployeeReviewDetails = createAsyncThunk<
  EmployeeReviews[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'reviewsTab/getEmployeeReviewDetails',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await reviewsTabApi.getEmployeeReviewDetails(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeReviewSlice = createSlice({
  name: 'reviewsTab',
  initialState: initialReviewsTabState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeReviewDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeReviewDetails = action.payload as EmployeeReviews[]
    })
    builder.addCase(getEmployeeReviewDetails.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployeeReviewDetails.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as ValidationError
    })
  },
})
const reviewsDetails = (state: RootState): EmployeeReviews[] =>
  state.reviewDetails.employeeReviewDetails

export const reviewDetailsThunk = {
  getEmployeeReviewDetails,
}
export const reviewDetailsSelectors = {
  reviewsDetails,
}
export const reviewDetailsService = {
  ...reviewDetailsThunk,
  actions: employeeReviewSlice.actions,
  selectors: reviewDetailsSelectors,
}
export default employeeReviewSlice.reducer
