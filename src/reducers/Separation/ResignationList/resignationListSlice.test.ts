import resignationListReducer, {
  resignationListService,
} from './resignationListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  CheckExitFeedBackForm,
  ResignationListSliceState,
  SeparationTimeLine,
  GetEmpDetailsType,
  SubmitExitFeedBackForm,
} from '../../../types/Separation/ResignationList/resignationListTypes'
import {
  mockClearanceDetails,
  mockResignationListHistory,
} from '../../../test/data/resignationListData'

describe('Resign List Slice', () => {
  describe('Resign List Reducer', () => {
    const initialResignationListState = {
      resignationList: { size: 0, list: [] },
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
      separationTimeLine: {} as SeparationTimeLine,
      checkExitFeedBackForm: {} as CheckExitFeedBackForm,
      clearanceDetails: [],
      toggle: '',
      getEmpDetailsType: {} as GetEmpDetailsType,
      submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
    } as ResignationListSliceState
    it('Should be able to set isLoading to "loading" if getResignationList is pending', () => {
      const action = {
        type: resignationListService.getResignationList.pending.type,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        resignationList: { list: [], size: 0 },
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
        separationTimeLine: {} as SeparationTimeLine,
        checkExitFeedBackForm: {} as CheckExitFeedBackForm,
        clearanceDetails: [],
        toggle: '',
        getEmpDetailsType: {} as GetEmpDetailsType,
        submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
      })
    })
    it('Should be able to set isLoading to "success" if getResignationList is fulfilled', () => {
      const action = {
        type: resignationListService.getResignationList.fulfilled.type,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        resignationList: undefined,
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
        separationTimeLine: {} as SeparationTimeLine,
        checkExitFeedBackForm: {} as CheckExitFeedBackForm,
        clearanceDetails: [],
        toggle: '',
        getEmpDetailsType: {} as GetEmpDetailsType,
        submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
      })
    })
    it('Should be able to set isLoading to "loading" if getSeparationTimeLine is pending', () => {
      const action = {
        type: resignationListService.getSeparationTimeLine.pending.type,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        resignationList: { list: [], size: 0 },
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
        separationTimeLine: {},
        checkExitFeedBackForm: {} as CheckExitFeedBackForm,
        clearanceDetails: [],
        toggle: '',
        getEmpDetailsType: {} as GetEmpDetailsType,
        submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
      })
    })
    it('Should be able to set isLoading to "loading" if getClearanceDetails is pending', () => {
      const action = {
        type: resignationListService.getClearanceDetails.pending.type,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        resignationList: { list: [], size: 0 },
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
        separationTimeLine: {} as SeparationTimeLine,
        checkExitFeedBackForm: {} as CheckExitFeedBackForm,
        clearanceDetails: [],
        toggle: '',
        getEmpDetailsType: {} as GetEmpDetailsType,
        submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
      })
    })
    it('Should be able to set isLoading to "success" if getSeparationTimeLine is fulfilled', () => {
      const action = {
        type: resignationListService.getSeparationTimeLine.fulfilled.type,
        payload: mockResignationListHistory,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        resignationList: { list: [], size: 0 },
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
        separationTimeLine: mockResignationListHistory,
        checkExitFeedBackForm: {} as CheckExitFeedBackForm,
        clearanceDetails: [],
        toggle: '',
        getEmpDetailsType: {} as GetEmpDetailsType,
        submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
      })
    })
    it('Should be able to set isLoading to "success" if getClearanceDetails is fulfilled', () => {
      const action = {
        type: resignationListService.getClearanceDetails.fulfilled.type,
        payload: mockClearanceDetails,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        resignationList: { list: [], size: 0 },
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
        separationTimeLine: {},
        checkExitFeedBackForm: {} as CheckExitFeedBackForm,
        clearanceDetails: mockClearanceDetails,
        toggle: '',
        getEmpDetailsType: {} as GetEmpDetailsType,
        submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
      })
    })

    it('Should be able to set isLoading to "loading" if getEmpDetails is pending', () => {
      const action = {
        type: resignationListService.getEmpDetails.pending.type,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        resignationList: { list: [], size: 0 },
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
        separationTimeLine: {} as SeparationTimeLine,
        checkExitFeedBackForm: {} as CheckExitFeedBackForm,
        clearanceDetails: [],
        toggle: '',
        getEmpDetailsType: {} as GetEmpDetailsType,
        submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
      })
    })

    it('Should be able to set isLoading to "loading" if saveExitFeedBackForm is pending', () => {
      const action = {
        type: resignationListService.saveExitFeedBackForm.pending.type,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        resignationList: { list: [], size: 0 },
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
        separationTimeLine: {} as SeparationTimeLine,
        checkExitFeedBackForm: {} as CheckExitFeedBackForm,
        clearanceDetails: [],
        toggle: '',
        getEmpDetailsType: {} as GetEmpDetailsType,
        submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
      })
    })
  })
})
