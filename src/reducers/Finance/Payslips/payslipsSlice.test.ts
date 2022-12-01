import paySlipsReducer, {
  paySlipsService,
  initialPaySlipsState,
} from './payslipsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockPaySlips } from '../../../test/data/paySlipsData'

describe('paySlips Slice', () => {
  describe('employeePaySlips test', () => {
    it('Should be able to set isLoading to "loading" if employeePaySlips is pending', () => {
      const action = {
        type: paySlipsService.employeePaySlips.pending.type,
      }
      const state = paySlipsReducer(initialPaySlipsState, action)
      expect(state).toEqual({
        employeePaySlips: [],
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if employeePaySlips is fulfilled', () => {
      const action = {
        type: paySlipsService.employeePaySlips.fulfilled.type,
        payload: mockPaySlips,
      }
      const state = paySlipsReducer(initialPaySlipsState, action)
      expect(state).toEqual({
        employeePaySlips: mockPaySlips,
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if employeePaySlips is rejected', () => {
      const action = {
        type: paySlipsService.employeePaySlips.rejected.type,
        payload: mockPaySlips,
      }
      const state = paySlipsReducer(initialPaySlipsState, action)
      expect(state).toEqual({
        employeePaySlips: [],
        isLoading: ApiLoadingState.failed,
        error: null,
      })
    })
  })
})
