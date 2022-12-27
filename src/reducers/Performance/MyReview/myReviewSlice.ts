import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { myReviewApi } from '../../../middleware/api/Performance/MyReview/myReviewApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeeAppraisalForm,
  MyReviewSliceState,
  PageDetails,
} from '../../../types/Performance/MyReview/myReviewTypes'

const initialMyReviewState: MyReviewSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  pageDetails: {} as PageDetails,
  employeeAppraisalForm: {} as EmployeeAppraisalForm,
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

const getEmployeeReviewForm = createAsyncThunk<
  EmployeeAppraisalForm | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('myReview/getEmployeeReviewForm', async (empId: number, thunkApi) => {
  try {
    return await myReviewApi.getEmployeeReviewForm(empId)
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
      .addCase(getEmployeeReviewForm.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeAppraisalForm = action.payload as EmployeeAppraisalForm
      })
      .addMatcher(
        isAnyOf(
          getEmployeePerformanceReview.pending,
          getEmployeeReviewForm.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeePerformanceReview.rejected,
          getEmployeeReviewForm.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.myReview.isLoading
const reviewPage = (state: RootState): PageDetails => state.myReview.pageDetails
const appraisalForm = (state: RootState): EmployeeAppraisalForm =>
  state.myReview.employeeAppraisalForm

const myReviewThunk = {
  getEmployeePerformanceReview,
  getEmployeeReviewForm,
}

const myReviewSelectors = {
  isLoading,
  reviewPage,
  appraisalForm,
}

export const myReviewService = {
  ...myReviewThunk,
  actions: myReviewSlice.actions,
  selectors: myReviewSelectors,
}

export default myReviewSlice.reducer
