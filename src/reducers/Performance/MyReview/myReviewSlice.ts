import type { PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  initialAppraisalForm,
  initialPageDetails,
  initialMyReviewModal,
} from './myReviewSliceConstants'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import myReviewApi from '../../../middleware/api/Performance/MyReview/myReviewApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  IncomingMyReviewAppraisalForm,
  MyReviewFormStatus,
  MyReviewModalProps,
  MyReviewSliceState,
  OutgoingSaveReviewCommentsParams,
  PageDetails,
  UpdateMyReviewFieldsDTO,
} from '../../../types/Performance/MyReview/myReviewTypes'
import { getUpdatedMyReviewKraList } from '../../../pages/Performance/MyReviews/MyReviewHelpers'

const initialMyReviewState: MyReviewSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  pageDetails: initialPageDetails,
  performanceRatings: [],
  appraisalForm: initialAppraisalForm,
  myReviewFormStatus: MyReviewFormStatus.saveForEmployee, // as the appraisal form comes, saves the form status
  isEmployeeSubmitButtonEnabled: false,
  isManagerSubmitButtonEnabled: false,
  incomingFinalRating: -1,
  modal: initialMyReviewModal, // used for showing modal across the whole component
  reviewComments: { size: 0, list: [] },
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

const getPerformanceRatingsThunk = createAsyncThunk(
  'myReview/getPerformanceRatingsThunk',
  async (_, thunkApi) => {
    try {
      return await myReviewApi.getPerformanceRatings()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getAppraisalFormThunk = createAsyncThunk(
  'myReview/getAppraisalFormThunk',
  async (employeeid: number, thunkApi) => {
    try {
      return await myReviewApi.getAppraisalForm(employeeid)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

// this is for manager side only
const getExistingAppraisalFormThunk = createAsyncThunk(
  'myReview/getAppraisalFormThunk',
  async (appraisalFormId: number, thunkApi) => {
    try {
      return await myReviewApi.getExistingAppraisalForm(appraisalFormId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const employeeAppraisalFormThunk = createAsyncThunk(
  'myReview/employeeAppraisalFormThunk',
  async (finalData: IncomingMyReviewAppraisalForm, thunkApi) => {
    try {
      return await myReviewApi.employeeAppraisalForm(finalData)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const employeeAppraisalFormForRatingThunk = createAsyncThunk(
  'myReview/employeeAppraisalFormForRatingThunk',
  async (data: IncomingMyReviewAppraisalForm, thunkApi) => {
    try {
      return await myReviewApi.employeeAppraisalFormForRating(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const saveReviewCommentsThunk = createAsyncThunk(
  'myReview/saveReviewCommentsThunk',
  async (finalParams: OutgoingSaveReviewCommentsParams, thunkApi) => {
    try {
      return await myReviewApi.saveReviewComments(finalParams)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getReviewCommentsThunk = createAsyncThunk(
  'myReview/getReviewCommentsThunk',
  async (appraisalFormId: number, thunkApi) => {
    try {
      return await myReviewApi.getReviewComments(appraisalFormId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const appraisalConfirmationThunk = createAsyncThunk(
  'myReview/appraisalConfirmationThunk',
  async (finalData: IncomingMyReviewAppraisalForm, thunkApi) => {
    try {
      return await myReviewApi.appraisalConfirmation(finalData)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const myReviewSlice = createSlice({
  name: 'myReview',
  initialState: initialMyReviewState,
  reducers: {
    setMyReviewFormStatus: (
      state,
      action: PayloadAction<MyReviewFormStatus>,
    ) => {
      state.myReviewFormStatus = action.payload
    },
    setEmployeeSubmitButtonEnabled: (state, action: PayloadAction<boolean>) => {
      // used to enable or disable the submit button for employee
      state.isEmployeeSubmitButtonEnabled = action.payload
    },
    setManagerSubmitButtonEnabled: (state, action: PayloadAction<boolean>) => {
      // used to enable or disable the submit button for manager
      state.isManagerSubmitButtonEnabled = action.payload
    },
    setRequestForDiscusstionForEmployee: (state) => {
      // when employee clicks requestDiscussion, this value is set to true which opens comments below table
      state.appraisalForm = {
        ...state.appraisalForm,
        requestDiscussion: true,
      }
    },
    updateKRAList: (state, action: PayloadAction<UpdateMyReviewFieldsDTO>) => {
      // updating the kra list in the function
      const updatedKraList = getUpdatedMyReviewKraList(
        state.appraisalForm.kra,
        action.payload,
      )
      state.appraisalForm = {
        ...state.appraisalForm,
        kra: updatedKraList,
      }
    },
    setModal: (state, action: PayloadAction<MyReviewModalProps>) => {
      state.modal = action.payload
    },
    setDisplayModal: (state, action: PayloadAction<boolean>) => {
      state.modal = {
        ...state.modal,
        showModal: action.payload,
      }
    },
    setClosedStatus: (state, action: PayloadAction<string>) => {
      const finalValue = action.payload === '' ? null : action.payload
      state.appraisalForm = {
        ...state.appraisalForm,
        closedStatus: finalValue,
      }
    },
    setClosedSummary: (state, action: PayloadAction<string>) => {
      const finalSummaryValue = action.payload === '' ? null : action.payload
      state.appraisalForm = {
        ...state.appraisalForm,
        closedSummary: finalSummaryValue,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeePerformanceReview.fulfilled, (state, action) => {
        state.pageDetails = action.payload as PageDetails
      })
      .addCase(getPerformanceRatingsThunk.fulfilled, (state, action) => {
        state.performanceRatings = action.payload
      })
      .addCase(
        employeeAppraisalFormForRatingThunk.fulfilled,
        (state, action) => {
          state.incomingFinalRating = action.payload
        },
      )
      .addCase(getReviewCommentsThunk.fulfilled, (state, action) => {
        state.reviewComments = action.payload
      })
      .addMatcher(
        isAnyOf(
          getAppraisalFormThunk.fulfilled,
          getExistingAppraisalFormThunk.fulfilled,
        ),
        (state, action) => {
          state.appraisalForm = action.payload
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeePerformanceReview.fulfilled,
          getAppraisalFormThunk.fulfilled,
          getExistingAppraisalFormThunk.fulfilled,
          getPerformanceRatingsThunk.fulfilled,
          employeeAppraisalFormThunk.fulfilled,
          employeeAppraisalFormForRatingThunk.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeePerformanceReview.pending,
          getAppraisalFormThunk.pending,
          getExistingAppraisalFormThunk.pending,
          getPerformanceRatingsThunk.pending,
          employeeAppraisalFormThunk.pending,
          employeeAppraisalFormForRatingThunk.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeePerformanceReview.rejected,
          getAppraisalFormThunk.rejected,
          getExistingAppraisalFormThunk.rejected,
          getPerformanceRatingsThunk.rejected,
          employeeAppraisalFormThunk.rejected,
          employeeAppraisalFormForRatingThunk.rejected,
        ),
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
  getAppraisalFormThunk,
  getExistingAppraisalFormThunk,
  getPerformanceRatingsThunk,
  employeeAppraisalFormThunk,
  employeeAppraisalFormForRatingThunk,
  saveReviewCommentsThunk,
  getReviewCommentsThunk,
  appraisalConfirmationThunk,
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
