import BankDetailsReducer, {
  initialBankDetailsState,
  bankDetailService,
} from './bankDetailsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockBankNameLookup } from '../../../test/data/bankDetailsData'
import { EditBankInformation } from '../../../types/Finance/PanDetails/bankDetailsTypes'

describe('Bank Detail Slice', () => {
  describe('bankNameList test', () => {
    it('Should be able to set isLoading to "loading" if bankNameList is pending', () => {
      const action = {
        type: bankDetailService.bankNameList.pending.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })

    it('Should be able to set isLoading to "success" if bankNameList is fulfilled', () => {
      const action = {
        type: bankDetailService.bankNameList.fulfilled.type,
        payload: mockBankNameLookup,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankNameList: mockBankNameLookup,
        isLoading: ApiLoadingState.succeeded,
        editBankAccount: {} as EditBankInformation,
      })
    })

    it('Should be able to set isLoading to "failed" if bankNameList is rejected', () => {
      const action = {
        type: bankDetailService.bankNameList.rejected.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })
  })
  //deleteBankAccount
  describe('deleteBankAccount test', () => {
    it('Should be able to set isLoading to "loading" if deleteBankAccount is pending', () => {
      const action = {
        type: bankDetailService.deleteBankAccount.pending.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })

    it('Should be able to set isLoading to "success" if deleteBankAccount is fulfilled', () => {
      const action = {
        type: bankDetailService.deleteBankAccount.fulfilled.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankNameList: [],
        isLoading: ApiLoadingState.succeeded,
        editBankAccount: {} as EditBankInformation,
      })
    })

    it('Should be able to set isLoading to "failed" if deleteBankAccount is rejected', () => {
      const action = {
        type: bankDetailService.deleteBankAccount.rejected.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })
  })
  //saveBankInformation
  describe('saveBankInformation test', () => {
    it('Should be able to set isLoading to "loading" if saveBankInformation is pending', () => {
      const action = {
        type: bankDetailService.saveBankInformation.pending.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })

    it('Should be able to set isLoading to "success" if saveBankInformation is fulfilled', () => {
      const action = {
        type: bankDetailService.saveBankInformation.fulfilled.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankNameList: [],
        isLoading: ApiLoadingState.succeeded,
        editBankAccount: {} as EditBankInformation,
      })
    })

    it('Should be able to set isLoading to "failed" if saveBankInformation is rejected', () => {
      const action = {
        type: bankDetailService.saveBankInformation.rejected.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })
  })
  // updateBankInformation
  describe('updateBankInformation test', () => {
    it('Should be able to set isLoading to "loading" if updateBankInformation is pending', () => {
      const action = {
        type: bankDetailService.updateBankInformation.pending.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })

    it('Should be able to set isLoading to "success" if updateBankInformation is fulfilled', () => {
      const action = {
        type: bankDetailService.updateBankInformation.fulfilled.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankNameList: [],
        isLoading: ApiLoadingState.succeeded,
        editBankAccount: {} as EditBankInformation,
      })
    })

    it('Should be able to set isLoading to "failed" if updateBankInformation is rejected', () => {
      const action = {
        type: bankDetailService.updateBankInformation.rejected.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })
  })
  // EditBank
  describe('editBankInformation test', () => {
    it('Should be able to set isLoading to "loading" if editBankInformation is pending', () => {
      const action = {
        type: bankDetailService.editBankInformation.pending.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })

    it('Should be able to set isLoading to "success" if editBankInformation is fulfilled', () => {
      const action = {
        type: bankDetailService.editBankInformation.fulfilled.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        error: 0,
        bankNameList: [],
        isLoading: ApiLoadingState.succeeded,
        editBankAccount: undefined,
      })
    })

    it('Should be able to set isLoading to "failed" if editBankInformation is rejected', () => {
      const action = {
        type: bankDetailService.editBankInformation.rejected.type,
      }
      const state = BankDetailsReducer(initialBankDetailsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: 0,
        bankNameList: [],
        editBankAccount: {} as EditBankInformation,
      })
    })
  })
})
