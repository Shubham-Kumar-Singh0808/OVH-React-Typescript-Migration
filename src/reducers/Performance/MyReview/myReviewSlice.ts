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
  ReviewComments,
} from '../../../types/Performance/MyReview/myReviewTypes'

const initialMyReviewState: MyReviewSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  pageDetails: {} as PageDetails,
  employeeAppraisalForm: {} as EmployeeAppraisalForm,
  performanceRatings: [],
  listSize: 0,
  reviewComments: [],
  appraisalFormId: 0,
  isReviewCommentsLoading: ApiLoadingState.idle,
  isButtonsVisible: undefined,
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

const saveAppraisalForm = createAsyncThunk(
  'myReview/saveAppraisalForm',
  async (saveEmployeeAppraisalForm: EmployeeAppraisalForm, thunkApi) => {
    try {
      return await myReviewApi.saveAppraisalForm(saveEmployeeAppraisalForm)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getReviewComments = createAsyncThunk(
  'myReview/getReviewComments',
  async (appraisalFormId: number, thunkApi) => {
    try {
      return await myReviewApi.getReviewComments(appraisalFormId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const myReviewSlice = createSlice({
  name: 'myReview',
  initialState: initialMyReviewState,
  reducers: {
    setIsButtonVisible: (state, action) => {
      state.isButtonsVisible = action.payload
    },
  },
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
      .addCase(getReviewComments.fulfilled, (state, action) => {
        state.isReviewCommentsLoading = ApiLoadingState.succeeded
        state.reviewComments = action.payload.list as ReviewComments[]
        state.listSize = action.payload.size
      })
      .addCase(getReviewComments.pending, (state) => {
        state.isReviewCommentsLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(
          getEmployeePerformanceReview.pending,
          getEmployeeReviewForm.pending,
          saveAppraisalForm.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeePerformanceReview.rejected,
          getEmployeeReviewForm.rejected,
          saveAppraisalForm.rejected,
          getReviewComments.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.myReview.isLoading
const isButtonsVisible = (state: RootState): boolean =>
  state.myReview.isButtonsVisible as boolean
const isReviewCommentsLoading = (state: RootState): LoadingState =>
  state.myReview.isReviewCommentsLoading
const reviewPage = (state: RootState): PageDetails => state.myReview.pageDetails
const appraisalForm = (state: RootState): EmployeeAppraisalForm =>
  state.myReview.employeeAppraisalForm
const reviewComments = (state: RootState): ReviewComments[] =>
  state.myReview.reviewComments
const listSize = (state: RootState): number => state.myReview.listSize
const appraisalFormId = (state: RootState): number =>
  state.myReview.employeeAppraisalForm.id

const myReviewThunk = {
  getEmployeePerformanceReview,
  getEmployeeReviewForm,
  saveAppraisalForm,
  getReviewComments,
}

const myReviewSelectors = {
  isLoading,
  reviewPage,
  appraisalForm,
  reviewComments,
  listSize,
  appraisalFormId,
  isReviewCommentsLoading,
  isButtonsVisible,
}

export const myReviewService = {
  ...myReviewThunk,
  actions: myReviewSlice.actions,
  selectors: myReviewSelectors,
}

export default myReviewSlice.reducer
