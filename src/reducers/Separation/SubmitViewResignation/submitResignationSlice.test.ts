import submitViewResignationReducer, {
  submitViewResignationServices,
} from './submitResignationSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { SubmitResignationSliceState } from '../../../types/Separation/SubmitViewResignation/submitResignationTypes'
import {
  mockResignationView,
  mockSeparationFormResponse,
} from '../../../test/data/submitViewResignationData'

describe('SubmitResignation Slice', () => {
  describe('SubmitResignationReducer', () => {
    const initialSubmitResignationState = {
      isLoading: ApiLoadingState.idle,
      getSeparationFormResponse: {},
      resignationView: {},
    } as SubmitResignationSliceState

    it('Should be able to set isLoading to "loading" if getSeparationFormResponse is pending', () => {
      const action = {
        type: submitViewResignationServices.getSeparationFormResponse.pending
          .type,
      }
      const state = submitViewResignationReducer(
        initialSubmitResignationState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        getSeparationFormResponse: {},
        resignationView: {},
      })
    })

    it('Should be able to set isLoading to "success" if getSeparationFormResponse is fulfilled', () => {
      const action = {
        type: submitViewResignationServices.getSeparationFormResponse.fulfilled,
        payload: mockSeparationFormResponse,
      }
      const state = submitViewResignationReducer(
        initialSubmitResignationState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        getSeparationFormResponse: mockSeparationFormResponse,
        resignationView: {},
      })
    })
    it('Should be able to set isLoading to "loading" if getEmployeeResignationView is pending', () => {
      const action = {
        type: submitViewResignationServices.getEmployeeResignationView.pending
          .type,
      }
      const state = submitViewResignationReducer(
        initialSubmitResignationState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        getSeparationFormResponse: {},
        resignationView: {},
      })
    })

    it('Should be able to set isLoading to "success" if getEmployeeResignationView is fulfilled', () => {
      const action = {
        type: submitViewResignationServices.getEmployeeResignationView
          .fulfilled,
        payload: mockResignationView,
      }
      const state = submitViewResignationReducer(
        initialSubmitResignationState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        getSeparationFormResponse: {},
        resignationView: mockResignationView,
      })
    })
  })
})
