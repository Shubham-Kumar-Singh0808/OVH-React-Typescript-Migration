import {
  initialPageDetails,
  initialAppraisalForm,
  initialMyReviewModal,
} from './myReviewSliceConstants'
import myReviewReducer, { myReviewService } from './myReviewSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  MyReviewSliceState,
  MyReviewFormStatus,
} from '../../../types/Performance/MyReview/myReviewTypes'
import {
  mockInitialEmployeeAppraisalForm,
  mockPerformanceRatings,
  mockReviewPageData,
} from '../../../test/data/myReviewData'

describe('My Review Slice', () => {
  const initialMyReviewState: MyReviewSliceState = {
    isLoading: ApiLoadingState.idle,
    error: null,
    pageDetails: initialPageDetails,
    performanceRatings: [],
    appraisalForm: initialAppraisalForm,
    myReviewFormStatus: MyReviewFormStatus.saveForEmployee,
    isEmployeeSubmitButtonEnabled: false,
    isManagerSubmitButtonEnabled: false,
    incomingFinalRating: -1,
    modal: initialMyReviewModal,
    reviewComments: { size: 0, list: [] },
  }
  it('Should be able to set isLoading to "loading" if getEmployeePerformanceReview is pending', () => {
    const action = {
      type: myReviewService.getEmployeePerformanceReview.pending.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('Should be able to set isLoading to "success" if getEmployeePerformanceReview is fulfilled', () => {
    const action = {
      type: myReviewService.getEmployeePerformanceReview.fulfilled.type,
      payload: mockReviewPageData,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.succeeded,
      pageDetails: mockReviewPageData,
    })
  })
  it('Should be able to set isLoading to "failed" if getEmployeePerformanceReview is rejected', () => {
    const action = {
      type: myReviewService.getEmployeePerformanceReview.rejected.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
  it('Should be able to set isLoading to "loading" if getAppraisalFormThunk is pending', () => {
    const action = {
      type: myReviewService.getAppraisalFormThunk.pending.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('Should be able to set isLoading to "success" if getAppraisalFormThunk is fulfilled', () => {
    const action = {
      type: myReviewService.getAppraisalFormThunk.fulfilled.type,
      payload: mockInitialEmployeeAppraisalForm,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.succeeded,
      appraisalForm: mockInitialEmployeeAppraisalForm,
    })
  })
  it('Should be able to set isLoading to "failed" if getAppraisalFormThunk is rejected', () => {
    const action = {
      type: myReviewService.getAppraisalFormThunk.rejected.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
  it('Should be able to set isLoading to "loading" if getExistingAppraisalFormThunk is pending', () => {
    const action = {
      type: myReviewService.getExistingAppraisalFormThunk.pending.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('Should be able to set isLoading to "success" if getExistingAppraisalFormThunk is fulfilled', () => {
    const action = {
      type: myReviewService.getExistingAppraisalFormThunk.fulfilled.type,
      payload: mockInitialEmployeeAppraisalForm,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.succeeded,
      appraisalForm: mockInitialEmployeeAppraisalForm,
    })
  })
  it('Should be able to set isLoading to "failed" if getExistingAppraisalFormThunk is rejected', () => {
    const action = {
      type: myReviewService.getExistingAppraisalFormThunk.rejected.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
  it('Should be able to set isLoading to "loading" if getPerformanceRatingsThunk is pending', () => {
    const action = {
      type: myReviewService.getPerformanceRatingsThunk.pending.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('Should be able to set isLoading to "success" if getPerformanceRatingsThunk is fulfilled', () => {
    const action = {
      type: myReviewService.getPerformanceRatingsThunk.fulfilled.type,
      payload: mockPerformanceRatings,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.succeeded,
      performanceRatings: mockPerformanceRatings,
    })
  })
  it('Should be able to set isLoading to "failed" if getPerformanceRatingsThunk is rejected', () => {
    const action = {
      type: myReviewService.getPerformanceRatingsThunk.rejected.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
  it('Should be able to set isLoading to "loading" if employeeAppraisalFormThunk is pending', () => {
    const action = {
      type: myReviewService.employeeAppraisalFormThunk.pending.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('Should be able to set isLoading to "success" if employeeAppraisalFormThunk is fulfilled', () => {
    const action = {
      type: myReviewService.employeeAppraisalFormThunk.fulfilled.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.succeeded,
    })
  })
  it('Should be able to set isLoading to "failed" if employeeAppraisalFormThunk is rejected', () => {
    const action = {
      type: myReviewService.employeeAppraisalFormThunk.rejected.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
  it('Should be able to set isLoading to "loading" if employeeAppraisalFormForRatingThunk is pending', () => {
    const action = {
      type: myReviewService.employeeAppraisalFormForRatingThunk.pending.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('Should be able to set isLoading to "success" if employeeAppraisalFormForRatingThunk is fulfilled', () => {
    const action = {
      type: myReviewService.employeeAppraisalFormForRatingThunk.fulfilled.type,
      payload: 3.2,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.succeeded,
      incomingFinalRating: 3.2,
    })
  })
  it('Should be able to set isLoading to "failed" if employeeAppraisalFormForRatingThunk is rejected', () => {
    const action = {
      type: myReviewService.employeeAppraisalFormForRatingThunk.rejected.type,
    }
    const state = myReviewReducer(initialMyReviewState, action)
    expect(state).toEqual({
      ...initialMyReviewState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
})
