import InitialCycleReducer, {
  initialCycleState,
  initiateCycleService,
} from './initiateCycleSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { GetActiveCycleData } from '../../../types/Settings/InitiateCycle/initiateCycleTypes'
import {
  mockActiveCycleData,
  mockAllCycles,
  mockAllQuestions,
} from '../../../test/data/initiateCycleData'

describe('InitiateCycle Slice', () => {
  describe('getActiveCycleData test', () => {
    it('Should be able to set isLoading to "loading" if getActiveCycleData is pending', () => {
      const action = {
        type: initiateCycleService.getActiveCycleData.pending.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "success" if getActiveCycleData is fulfilled', () => {
      const action = {
        type: initiateCycleService.getActiveCycleData.fulfilled.type,
        payload: mockActiveCycleData,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        activeCycleData: mockActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "failed" if getActiveCycleData is rejected', () => {
      const action = {
        type: initiateCycleService.getActiveCycleData.rejected.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
      })
    })
  })

  describe('getAllCycles test', () => {
    it('Should be able to set isLoading to "loading" if getAllCycles is pending', () => {
      const action = {
        type: initiateCycleService.getAllCycles.pending.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "success" if getAllCycles is fulfilled', () => {
      const action = {
        type: initiateCycleService.getAllCycles.fulfilled.type,
        payload: mockAllCycles?.list,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: undefined,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: mockAllCycles?.list,
        allQuestions: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "failed" if getAllCycles is rejected', () => {
      const action = {
        type: initiateCycleService.getAllCycles.rejected.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
      })
    })
  })

  describe('getAllQuestions test', () => {
    it('Should be able to set isLoading to "loading" if getAllQuestions is pending', () => {
      const action = {
        type: initiateCycleService.getAllQuestions.pending.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "success" if getAllQuestions is fulfilled', () => {
      const action = {
        type: initiateCycleService.getAllQuestions.fulfilled.type,
        payload: mockAllQuestions?.list,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: undefined,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: mockAllQuestions?.list,
      })
    })

    it('Should be able to set isLoading to "failed" if getAllQuestions is rejected', () => {
      const action = {
        type: initiateCycleService.getAllQuestions.rejected.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
      })
    })
  })
})
