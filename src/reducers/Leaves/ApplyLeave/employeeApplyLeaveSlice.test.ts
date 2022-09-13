import reducer, { employeeLeaveApplyServices } from './employeeApplyLeaveSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  EmployeeLeaveApply,
  EmployeeLeaveApplyState,
} from '../../../types/Leaves/ApplyLeave/employeeApplyLeaves'
import { mockLeaveType } from '../../../test/data/employeeLeaveApplyData'

describe('Apply Leave  Slice', () => {
  describe('Reducer', () => {
    const initialLeaveSummaryState = {
      employeeLeaveType: [],
      employeeLeaveApply: {} as EmployeeLeaveApply,
      isLoading: ApiLoadingState.idle,
      error: 0,
    } as EmployeeLeaveApplyState

    it('Should be able to set isLoading to "loading" if `getEmployeeLeaveType` is pending', () => {
      const action = {
        type: employeeLeaveApplyServices.getEmployeeLeaveType.pending.type,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        employeeLeaveType: [],
        employeeLeaveApply: {} as EmployeeLeaveApply,
        isLoading: ApiLoadingState.loading,
        error: 0,
      })
    })
    it('Should be able to set isLoading to "success" if `getEmployeeLeaveType` is fulfilled', () => {
      const action = {
        type: employeeLeaveApplyServices.getEmployeeLeaveType.fulfilled.type,
        payload: mockLeaveType,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        employeeLeaveType: mockLeaveType,
        employeeLeaveApply: {} as EmployeeLeaveApply,
        isLoading: ApiLoadingState.succeeded,
        error: 0,
      })
    })
  })
})
