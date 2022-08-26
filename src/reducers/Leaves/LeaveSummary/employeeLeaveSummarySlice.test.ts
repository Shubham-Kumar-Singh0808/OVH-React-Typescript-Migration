import reducer, { leaveSummaryService } from './employeeLeaveSummarySlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  EmployeeLeaveSummarySliceState,
  LeaveSummary,
} from '../../../types/Leaves/LeaveSummary/employeeLeaveSummaryTypes'
import { mockLeaveSummary } from '../../../test/data/leaveSummaryData'
import { mockLeaveHistory } from '../../../test/data/leaveHistoryData'

describe('Leave Summary Slice', () => {
  describe('Reducer', () => {
    const initialLeaveSummaryState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      employeeLeaveHistory: [],
      list: 0,
      employeeLeaveSummary: {} as LeaveSummary,
    } as EmployeeLeaveSummarySliceState

    it('Should be able to set isLoading to "loading" if `getEmployeeLeaveSummary` is pending', () => {
      const action = {
        type: leaveSummaryService.getEmployeeLeaveSummary.pending.type,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        employeeLeaveHistory: [],
        list: 0,
        employeeLeaveSummary: {} as LeaveSummary,
      })
    })

    it('Should be able to set isLoading to "success" if `getEmployeeLeaveSummary` is fulfilled', () => {
      const action = {
        type: leaveSummaryService.getEmployeeLeaveSummary.fulfilled.type,
        payload: mockLeaveSummary,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        employeeLeaveHistory: [],
        list: 0,
        employeeLeaveSummary: mockLeaveSummary,
      })
    })

    it('Should be able to set isLoading to "success" if `getEmployeeLeaveSummary` is rejected', () => {
      const action = {
        type: leaveSummaryService.getEmployeeLeaveSummary.rejected.type,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        employeeLeaveHistory: [],
        list: 0,
        employeeLeaveSummary: {},
      })
    })

    it('Should be able to set isLoading to "loading" if `getEmployeeLeaveHistory` is pending', () => {
      const action = {
        type: leaveSummaryService.getEmployeeLeaveHistory.pending.type,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        employeeLeaveHistory: [],
        list: 0,
        employeeLeaveSummary: {} as LeaveSummary,
      })
    })

    it('Should be able to set isLoading to "success" if `getEmployeeLeaveHistory` is fulfilled', () => {
      const action = {
        type: leaveSummaryService.getEmployeeLeaveHistory.fulfilled.type,
        payload: mockLeaveHistory,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        employeeLeaveHistory: undefined,
        list: undefined,
        employeeLeaveSummary: {},
      })
    })

    it('Should be able to set isLoading to "success" if `getEmployeeLeaveHistory` is rejected', () => {
      const action = {
        type: leaveSummaryService.getEmployeeLeaveHistory.rejected.type,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        employeeLeaveHistory: [],
        list: 0,
        employeeLeaveSummary: {},
      })
    })
    it('Should be able to set isLoading to "loading" if `cancelEmployeeLeave` is pending', () => {
      const action = {
        type: leaveSummaryService.cancelEmployeeLeave.pending.type,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        employeeLeaveHistory: [],
        list: 0,
        employeeLeaveSummary: {} as LeaveSummary,
      })
    })

    it('Should be able to set isLoading to "success" if `cancelEmployeeLeave` is fulfilled', () => {
      const action = {
        type: leaveSummaryService.cancelEmployeeLeave.fulfilled.type,
        payload: mockLeaveHistory,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        employeeLeaveHistory: [],
        list: 0,
        employeeLeaveSummary: {},
      })
    })

    it('Should be able to set isLoading to "success" if `cancelEmployeeLeave` is rejected', () => {
      const action = {
        type: leaveSummaryService.cancelEmployeeLeave.rejected.type,
      }
      const state = reducer(initialLeaveSummaryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        employeeLeaveHistory: [],
        list: 0,
        employeeLeaveSummary: {},
      })
    })
  })
})
