import panDetailsReducer, {
  initialPanDetailsState,
  panDetailService,
} from './panDetailsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { BankInformation } from '../../../types/Finance/PanDetails/panDetailsTypes'
import { mockBankInformation } from '../../../test/data/panDetailsData'

describe('Pan Detail Slice', () => {
  describe('bankInformation test', () => {
    it('Should be able to set isLoading to "loading" if bankInformation is pending', () => {
      const action = {
        type: panDetailService.bankInformation.pending.type,
      }
      const state = panDetailsReducer(initialPanDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankInfo: {} as BankInformation,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "success" if bankInformation is fulfilled', () => {
      const action = {
        type: panDetailService.bankInformation.fulfilled.type,
        payload: mockBankInformation,
      }
      const state = panDetailsReducer(initialPanDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankInfo: mockBankInformation,
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "failed" if bankInformation is rejected', () => {
      const action = {
        type: panDetailService.bankInformation.rejected.type,
      }
      const state = panDetailsReducer(initialPanDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankInfo: {} as BankInformation,
        isLoading: ApiLoadingState.failed,
      })
    })
  })
  // updateFinanceInformation
  describe('updateFinanceInformation test', () => {
    it('Should be able to set isLoading to "loading" if updateFinanceInformation is pending', () => {
      const action = {
        type: panDetailService.updateFinanceInformation.pending.type,
      }
      const state = panDetailsReducer(initialPanDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankInfo: {} as BankInformation,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "success" if updateFinanceInformation is fulfilled', () => {
      const action = {
        type: panDetailService.updateFinanceInformation.fulfilled.type,
      }
      const state = panDetailsReducer(initialPanDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankInfo: {} as BankInformation,
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "failed" if updateFinanceInformation is rejected', () => {
      const action = {
        type: panDetailService.updateFinanceInformation.rejected.type,
      }
      const state = panDetailsReducer(initialPanDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankInfo: {} as BankInformation,
        isLoading: ApiLoadingState.failed,
      })
    })
  })

  //uploadEmployeeFinanceDetails
  describe('uploadEmployeeFinanceDetails test', () => {
    it('Should be able to set isLoading to "loading" if uploadEmployeeFinanceDetails is pending', () => {
      const action = {
        type: panDetailService.uploadEmployeeFinanceDetails.pending.type,
      }
      const state = panDetailsReducer(initialPanDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankInfo: {} as BankInformation,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "success" if uploadEmployeeFinanceDetails is fulfilled', () => {
      const action = {
        type: panDetailService.uploadEmployeeFinanceDetails.fulfilled.type,
      }
      const state = panDetailsReducer(initialPanDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankInfo: {} as BankInformation,
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "failed" if uploadEmployeeFinanceDetails is rejected', () => {
      const action = {
        type: panDetailService.uploadEmployeeFinanceDetails.rejected.type,
      }
      const state = panDetailsReducer(initialPanDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankInfo: {} as BankInformation,
        isLoading: ApiLoadingState.failed,
      })
    })
  })
})
