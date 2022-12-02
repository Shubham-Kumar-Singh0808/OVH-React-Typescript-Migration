import EmployeeAccountReducer, {
  initialEmployeeAccountsState,
  employeeAccountService,
} from './employeeAccountsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'

describe('Employee Account Slice', () => {
  describe('getFinanceDetails test', () => {
    it('Should be able to set isLoading to "loading" if getFinanceDetails is pending', () => {
      const action = {
        type: employeeAccountService.getFinanceDetails.pending.type,
      }
      const state = EmployeeAccountReducer(initialEmployeeAccountsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        financeData: [],
      })
    })

    it('Should be able to set isLoading to "failed" if getFinanceDetails is rejected', () => {
      const action = {
        type: employeeAccountService.getFinanceDetails.rejected.type,
      }
      const state = EmployeeAccountReducer(initialEmployeeAccountsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        financeData: [],
      })
    })
  })
})
