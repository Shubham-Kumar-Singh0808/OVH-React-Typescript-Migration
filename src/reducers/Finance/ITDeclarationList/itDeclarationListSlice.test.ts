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
      investments: [],
      sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "loading" if addInvestment is pending', () => {
      const action = {
        type: itDeclarationListService.addInvestment.pending.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "success" if `addInvestment` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.addInvestment.fulfilled.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "failed" if `addInvestment` is rejected', () => {
      const action = {
        type: itDeclarationListService.addInvestment.rejected.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "loading" if deleteInvestment is pending', () => {
      const action = {
        type: itDeclarationListService.deleteInvestment.pending.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "success" if `deleteInvestment` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.deleteInvestment.fulfilled.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "failed" if `deleteInvestment` is rejected', () => {
      const action = {
        type: itDeclarationListService.deleteInvestment.rejected.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "loading" if addCycle is pending', () => {
      const action = {
        type: itDeclarationListService.addCycle.pending.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "success" if `addCycle` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.addCycle.fulfilled.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "failed" if `addCycle` is rejected', () => {
      const action = {
        type: itDeclarationListService.addCycle.rejected.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "loading" if deleteCycle is pending', () => {
      const action = {
        type: itDeclarationListService.deleteCycle.pending.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "success" if `deleteCycle` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.deleteCycle.fulfilled.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "failed" if `deleteCycle` is rejected', () => {
      const action = {
        type: itDeclarationListService.deleteCycle.rejected.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "loading" if isInvestmentExist is pending', () => {
      const action = {
        type: itDeclarationListService.isInvestmentExist.pending.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "success" if `isInvestmentExist` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.isInvestmentExist.fulfilled.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "failed" if `isInvestmentExist` is rejected', () => {
      const action = {
        type: itDeclarationListService.isInvestmentExist.rejected.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "loading" if updateInvestment is pending', () => {
      const action = {
        type: itDeclarationListService.updateInvestment.pending.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "success" if `updateInvestment` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.updateInvestment.fulfilled.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "failed" if `updateInvestment` is rejected', () => {
      const action = {
        type: itDeclarationListService.updateInvestment.rejected.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "loading" if isCycleExist is pending', () => {
      const action = {
        type: itDeclarationListService.isCycleExist.pending.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "success" if `isCycleExist` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.isCycleExist.fulfilled.type,
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
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "failed" if `isCycleExist` is rejected', () => {
      const action = {
        type: itDeclarationListService.isCycleExist.rejected.type,
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
        investments: [],
        sections: [],
      })
    })
  })
})
