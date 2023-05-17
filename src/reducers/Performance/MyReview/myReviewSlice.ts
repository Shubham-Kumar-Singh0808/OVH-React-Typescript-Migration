import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { myReviewApi } from '../../../middleware/api/Performance/MyReview/myReviewApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeeAppraisalForm,
  GetPerformanceRatings,
  MyReviewSliceState,
  PageDetails,
  ReviewComments,
  SaveReviewCommentsProps,
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
  getPerformanceRatings: [],
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

const submitAppraisalFormForRating = createAsyncThunk(
  'myReview/submitAppraisalFormForRating',
  async (submitEmployeeAppraisalForm: EmployeeAppraisalForm, thunkApi) => {
    try {
      return await myReviewApi.submitAppraisalFormForRating(
        submitEmployeeAppraisalForm,
      )
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

const getPerformanceRatings = createAsyncThunk(
  'myReview/getPerformanceRatings',
  async (_, thunkApi) => {
    try {
      return await myReviewApi.getPerformanceRatings()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const existingAppraisalForm = createAsyncThunk(
  'myReview/existingAppraisalForm',
  async (appraisalFormId: number, thunkApi) => {
    try {
      return await myReviewApi.existingAppraisalForm(appraisalFormId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const saveReviewComments = createAsyncThunk(
  'myReview/saveReviewComments',
  async (props: SaveReviewCommentsProps, thunkApi) => {
    try {
      return await myReviewApi.saveReviewComments(props)
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
    updateKPI: (state, action) => {
      const { kraId, kpiId, kpi } = action.payload
      const appraisalFormKRAs = state.employeeAppraisalForm.kra
      for (let i = 0; i < appraisalFormKRAs.length; i++) {
        if (appraisalFormKRAs[i].id === kraId) {
          console.log(kpiId)
          const filteredKPI = appraisalFormKRAs[i].kpis.filter(
            (kpi) => kpi.id !== kpiId,
          )
          console.log(filteredKPI)
          filteredKPI.push(kpi)
          console.log(filteredKPI)
          appraisalFormKRAs[i].kpis = filteredKPI
          console.log(appraisalFormKRAs)
          break
        }
      }
      state.employeeAppraisalForm = {
        ...state.employeeAppraisalForm,
        kra: appraisalFormKRAs,
      }
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
      .addCase(getPerformanceRatings.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getPerformanceRatings = action.payload
      })
      .addCase(existingAppraisalForm.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeAppraisalForm = action.payload
      })
      .addMatcher(
        isAnyOf(
          getEmployeePerformanceReview.pending,
          getEmployeeReviewForm.pending,
          saveAppraisalForm.pending,
          getPerformanceRatings.pending,
          existingAppraisalForm.pending,
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
          getPerformanceRatings.rejected,
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

const performanceRatings = (state: RootState): GetPerformanceRatings[] =>
  state.myReview.getPerformanceRatings

const myReviewThunk = {
  getEmployeePerformanceReview,
  getEmployeeReviewForm,
  saveAppraisalForm,
  getReviewComments,
  getPerformanceRatings,
  submitAppraisalFormForRating,
  existingAppraisalForm,
  saveReviewComments,
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
  performanceRatings,
}

export const myReviewService = {
  ...myReviewThunk,
  actions: myReviewSlice.actions,
  selectors: myReviewSelectors,
}

export default myReviewSlice.reducer
