import investmentCheckListReducer, {
  investmentCheckListService,
} from './investmentCheckListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockInvestments,
  mockSections,
} from '../../../test/data/investmentCheckListData'

describe('Investment Check List Slice', () => {
  describe('Investment Check List Reducer', () => {
    const initialInvestmentCheckListState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      investments: [],
      sections: [],
    }
    it('Should be able to set isLoading to "loading" if getSections is pending', () => {
      const action = {
        type: investmentCheckListService.getSections.pending.type,
      }
      const state = investmentCheckListReducer(
        initialInvestmentCheckListState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "success" if `getSections` is fulfilled', () => {
      const action = {
        type: investmentCheckListService.getSections.fulfilled.type,
        payload: mockSections,
      }
      const state = investmentCheckListReducer(
        initialInvestmentCheckListState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        investments: [],
        sections: mockSections,
      })
    })
    it('Should be able to set isLoading to "failed" if `getSections` is rejected', () => {
      const action = {
        type: investmentCheckListService.getSections.rejected.type,
      }
      const state = investmentCheckListReducer(
        initialInvestmentCheckListState,
        action,
      )
      expect(state).toEqual({
        error: undefined,
        investments: [],
        sections: [],
        isLoading: ApiLoadingState.failed,
      })
    })
    it('Should be able to set isLoading to "loading" if getSections is pending', () => {
      const action = {
        type: investmentCheckListService.getInvestments.pending.type,
      }
      const state = investmentCheckListReducer(
        initialInvestmentCheckListState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        investments: [],
        sections: [],
      })
    })
    it('Should be able to set isLoading to "success" if `getInvestments` is fulfilled', () => {
      const action = {
        type: investmentCheckListService.getInvestments.fulfilled.type,
        payload: mockInvestments,
      }
      const state = investmentCheckListReducer(
        initialInvestmentCheckListState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        investments: mockInvestments,
        sections: [],
      })
    })
    it('Should be able to set isLoading to "failed" if `getInvestments` is rejected', () => {
      const action = {
        type: investmentCheckListService.getInvestments.rejected.type,
      }
      const state = investmentCheckListReducer(
        initialInvestmentCheckListState,
        action,
      )
      expect(state).toEqual({
        error: undefined,
        investments: [],
        sections: [],
        isLoading: ApiLoadingState.failed,
      })
    })
  })
})
