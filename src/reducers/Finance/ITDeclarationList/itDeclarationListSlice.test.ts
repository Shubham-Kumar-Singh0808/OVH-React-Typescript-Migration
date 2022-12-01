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
      })
    })
  })
})
