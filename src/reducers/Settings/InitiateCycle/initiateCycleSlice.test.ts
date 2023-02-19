import InitialCycleReducer, {
  initialCycleState,
  initiateCycleService,
} from './initiateCycleSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  GetActiveCycleData,
  NominationCycleDto,
} from '../../../types/Settings/InitiateCycle/initiateCycleTypes'
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
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
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
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
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
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
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
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
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
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
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
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
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
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
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
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
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
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
      })
    })
  })

  describe('editCycle test', () => {
    it('Should be able to set isLoading to "loading" if editCycle is pending', () => {
      const action = {
        type: initiateCycleService.editCycle.pending.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
      })
    })

    it('Should be able to set isLoading to "success" if editCycle is fulfilled', () => {
      const action = {
        type: initiateCycleService.editCycle.fulfilled.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })

    it('Should be able to set isLoading to "failed" if editCycle is rejected', () => {
      const action = {
        type: initiateCycleService.editCycle.rejected.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
      })
    })
  })

  describe('updateCycle test', () => {
    it('Should be able to set isLoading to "loading" if updateCycle is pending', () => {
      const action = {
        type: initiateCycleService.updateCycle.pending.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
      })
    })

    it('Should be able to set isLoading to "success" if updateCycle is fulfilled', () => {
      const action = {
        type: initiateCycleService.updateCycle.fulfilled.type,
        payload: mockAllQuestions?.list,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
      })
    })

    it('Should be able to set isLoading to "failed" if updateCycle is rejected', () => {
      const action = {
        type: initiateCycleService.updateCycle.rejected.type,
      }
      const state = InitialCycleReducer(initialCycleState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        activeCycleData: {} as GetActiveCycleData,
        allCycles: { size: 0, list: [] },
        allQuestions: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
        toggle: '',
        editCycle: {} as NominationCycleDto,
      })
    })
  })
})
