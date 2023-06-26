import creditCardListReducer, {
  creditCardListService,
} from './creditCardListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { CreditCardListSliceState } from '../../../types/ExpenseManagement/CreditCardList/creditCardListTypes'
import { mockCreditCardListData } from '../../../test/data/creditCardListData'

describe('Credit Cards List Slice', () => {
  describe('Expense Category', () => {
    const initialCreditCardListState: CreditCardListSliceState = {
      getCardsList: [],
      isLoading: ApiLoadingState.idle,
      error: null,
    }

    it('Should be able to set isLoading to "loading" if get All Credit Card Data is pending', () => {
      const action = {
        type: creditCardListService.getCreditCardsList.pending.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if edit Credit Card Data is pending', () => {
      const action = {
        type: creditCardListService.editCreditCardDetails.pending.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if get update Credit Card Data is pending', () => {
      const action = {
        type: creditCardListService.updateCreditCardList.pending.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if get delete Credit Card Data is pending', () => {
      const action = {
        type: creditCardListService.deleteCreditCardList.pending.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "succeeded" if get All Credit Card Data is fulfilled', () => {
      const action = {
        type: creditCardListService.getCreditCardsList.fulfilled.type,
        payload: mockCreditCardListData,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: mockCreditCardListData,
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if edit Credit Card Data is fulfilled', () => {
      const action = {
        type: creditCardListService.editCreditCardDetails.fulfilled.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if get update Credit Card Data is fulfilled', () => {
      const action = {
        type: creditCardListService.updateCreditCardList.fulfilled.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if get delete Credit Card Data is fulfilled', () => {
      const action = {
        type: creditCardListService.deleteCreditCardList.fulfilled.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })

    it('Should be able to set isLoading to "failed" if get All Credit Card Data is rejected', () => {
      const action = {
        type: creditCardListService.getCreditCardsList.rejected.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.failed,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if edit Credit Card Data is rejected', () => {
      const action = {
        type: creditCardListService.editCreditCardDetails.rejected.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.failed,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if get update Credit Card Data is rejected', () => {
      const action = {
        type: creditCardListService.updateCreditCardList.rejected.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.failed,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if get delete Credit Card Data is rejected', () => {
      const action = {
        type: creditCardListService.deleteCreditCardList.rejected.type,
      }
      const state = creditCardListReducer(initialCreditCardListState, action)
      expect(state).toEqual({
        getCardsList: [],
        isLoading: ApiLoadingState.failed,
        error: null,
      })
    })
  })
})
