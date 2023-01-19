import reviewListReducer, { reviewListService } from './reviewListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockConfigurationCycle,
  mockDesignations,
  mockEmployeeDepartments,
  mockReviewList,
} from '../../../test/data/reviewListData'
import { ReviewListSliceState } from '../../../types/Performance/ReviewList/reviewListTypes'

describe('Review List Slice', () => {
  describe('ReviewList Reducer', () => {
    const initialReviewState = {
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
    } as ReviewListSliceState

    it('Should be able to set isLoading to "loading" if getAppraisalCycles is pending', () => {
      const action = {
        type: reviewListService.getAppraisalCycles.pending.type,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
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
      })
    })
    it('Should be able to set isLoading to "success" if getAppraisalCycles is fulfilled', () => {
      const action = {
        type: reviewListService.getAppraisalCycles.fulfilled.type,
        payload: mockConfigurationCycle,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        employeeDepartments: [],
        appraisal: [],
        listSize: 0,
        appraisalCycle: mockConfigurationCycle,
        designations: [],
        employeeReviewList: {
          list: [],
          size: 0,
        },
      })
    })
    it('Should be able to set isLoading to "failed" if getAppraisalCycles is rejected', () => {
      const action = {
        type: reviewListService.getAppraisalCycles.rejected.type,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        employeeDepartments: [],
        appraisal: [],
        listSize: 0,
        appraisalCycle: [],
        designations: [],
        employeeReviewList: {
          list: [],
          size: 0,
        },
      })
    })
    it('Should be able to set isLoading to "loading" if getEmployeeDepartments is pending', () => {
      const action = {
        type: reviewListService.getEmployeeDepartments.pending.type,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
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
      })
    })
    it('Should be able to set isLoading to "success" if getEmployeeDepartments is fulfilled', () => {
      const action = {
        type: reviewListService.getEmployeeDepartments.fulfilled.type,
        payload: mockEmployeeDepartments,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        employeeDepartments: mockEmployeeDepartments,
        appraisal: [],
        listSize: 0,
        appraisalCycle: [],
        designations: [],
        employeeReviewList: {
          list: [],
          size: 0,
        },
      })
    })
    it('Should be able to set isLoading to "failed" if getEmployeeDepartments is rejected', () => {
      const action = {
        type: reviewListService.getEmployeeDepartments.rejected.type,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        employeeDepartments: [],
        appraisal: [],
        listSize: 0,
        appraisalCycle: [],
        designations: [],
        employeeReviewList: {
          list: [],
          size: 0,
        },
      })
    })
    it('Should be able to set isLoading to "loading" if getDesignations is pending', () => {
      const action = {
        type: reviewListService.getDesignations.pending.type,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
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
      })
    })
    it('Should be able to set isLoading to "success" if getDesignations is fulfilled', () => {
      const action = {
        type: reviewListService.getDesignations.fulfilled.type,
        payload: mockDesignations,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        employeeDepartments: [],
        appraisal: [],
        listSize: 0,
        appraisalCycle: [],
        designations: mockDesignations,
        employeeReviewList: {
          list: [],
          size: 0,
        },
      })
    })
    it('Should be able to set isLoading to "failed" if getDesignations is rejected', () => {
      const action = {
        type: reviewListService.getDesignations.rejected.type,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        employeeDepartments: [],
        appraisal: [],
        listSize: 0,
        appraisalCycle: [],
        designations: [],
        employeeReviewList: {
          list: [],
          size: 0,
        },
      })
    })
    it('Should be able to set isLoading to "loading" if getReviewList is pending', () => {
      const action = {
        type: reviewListService.getReviewList.pending.type,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
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
      })
    })
    it('Should be able to set isLoading to "success" if getReviewList is fulfilled', () => {
      const action = {
        type: reviewListService.getReviewList.fulfilled.type,
        payload: mockReviewList,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        employeeDepartments: [],
        appraisal: [],
        listSize: 41,
        appraisalCycle: [],
        designations: [],
        employeeReviewList: {
          list: mockReviewList.list,
          size: mockReviewList.size,
        },
      })
    })
    it('Should be able to set isLoading to "failed" if getReviewList is rejected', () => {
      const action = {
        type: reviewListService.getReviewList.rejected.type,
      }
      const state = reviewListReducer(initialReviewState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        employeeDepartments: [],
        appraisal: [],
        listSize: 0,
        appraisalCycle: [],
        designations: [],
        employeeReviewList: {
          list: [],
          size: 0,
        },
      })
    })
  })
})
