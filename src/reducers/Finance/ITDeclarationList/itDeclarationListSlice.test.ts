import itDeclarationListReducer, {
  itDeclarationListService,
} from './itDeclarationListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockDeclarationList,
  mockInvestmentCycles,
} from '../../../test/data/itDeclarationListData'

describe('IT Declaration List Slice', () => {
  describe('IT Declaration List Reducer', () => {
    const initialITDeclarationListState = {
      itDeclarationForms: [],
      listSize: 0,
      searchEmployee: '',
      isLoading: ApiLoadingState.idle,
      error: null,
      cycles: [],
      currentPage: 1,
      pageSize: 20,
      toggle: '',
    }
    it('Should be able to set isLoading to "loading" if getCycles is pending', () => {
      const action = {
        type: itDeclarationListService.getCycles.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.loading,
        error: null,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "success" if `getCycles` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.getCycles.fulfilled.type,
        payload: mockInvestmentCycles,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.succeeded,
        error: null,
        cycles: mockInvestmentCycles,
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "failed" if `getCycles` is rejected', () => {
      const action = {
        type: itDeclarationListService.getCycles.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.failed,
        error: undefined,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "loading" if getCycles is pending', () => {
      const action = {
        type: itDeclarationListService.getITDeclarationForm.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.loading,
        error: null,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "success" if `getITDeclarationForm` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.getITDeclarationForm.fulfilled.type,
        payload: mockDeclarationList,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: mockDeclarationList.itforms,
        listSize: mockDeclarationList.itformlistsize,
        searchEmployee: '',
        isLoading: ApiLoadingState.succeeded,
        error: null,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "failed" if `getCycles` is rejected', () => {
      const action = {
        type: itDeclarationListService.getITDeclarationForm.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.failed,
        error: undefined,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "loading" if addSection is pending', () => {
      const action = {
        type: itDeclarationListService.addSection.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.loading,
        error: null,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "success" if `addSection` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.addSection.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.succeeded,
        error: null,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "failed" if `addSection` is rejected', () => {
      const action = {
        type: itDeclarationListService.addSection.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.failed,
        error: undefined,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "loading" if updateSection is pending', () => {
      const action = {
        type: itDeclarationListService.updateSection.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.loading,
        error: null,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "success" if `updateSection` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.updateSection.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.succeeded,
        error: null,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "failed" if `updateSection` is rejected', () => {
      const action = {
        type: itDeclarationListService.updateSection.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.failed,
        error: undefined,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "loading" if deleteSection is pending', () => {
      const action = {
        type: itDeclarationListService.deleteSection.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.loading,
        error: null,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "success" if `deleteSection` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.deleteSection.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.succeeded,
        error: null,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "failed" if `deleteSection` is rejected', () => {
      const action = {
        type: itDeclarationListService.deleteSection.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        itDeclarationForms: [],
        listSize: 0,
        searchEmployee: '',
        isLoading: ApiLoadingState.failed,
        error: undefined,
        cycles: [],
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
  })
})
