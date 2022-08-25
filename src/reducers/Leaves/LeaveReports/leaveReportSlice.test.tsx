import reducer, { leaveReportService } from './leaveReportSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LeaveReportState } from '../../../types/Leaves/LeaveReports/leaveReportTypes'
import {
  mockCreditYearData,
  mockLeaveReportData,
} from '../../../test/data/LeaveReportData'

describe('LeaveReport Slice', () => {
  describe('Reducer', () => {
    const initialLeaveReportState = {
      leaveSummaries: { list: [], size: 0, name: '', length: 0 },
      selectFinancialYear: [],
      isLoading: ApiLoadingState.idle,
      error: null,
      financialYear: 0,
      listSize: 0,
    } as LeaveReportState

    it('Should be able to set isLoading to "loading" if getAllEmployeesLeaveSummaries is pending', () => {
      const action = {
        type: leaveReportService.getAllEmployeesLeaveSummaries.pending.type,
      }
      const state = reducer(initialLeaveReportState, action)
      expect(state).toEqual({
        leaveSummaries: { list: [], size: 0, name: '', length: 0 },
        selectFinancialYear: [],
        isLoading: ApiLoadingState.loading,
        error: null,
        financialYear: 0,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "success" if getAllEmployeesLeaveSummaries is fulfilled', () => {
      const action = {
        type: leaveReportService.getAllEmployeesLeaveSummaries.fulfilled.type,
        payload: mockLeaveReportData,
      }
      const state = reducer(initialLeaveReportState, action)
      expect(state).toEqual({
        leaveSummaries: mockLeaveReportData,
        selectFinancialYear: [],
        isLoading: ApiLoadingState.succeeded,
        error: null,
        financialYear: 0,
        listSize: 217,
      })
    })

    it('Should be able to set isLoading to "success" if creditedYearDetails is fulfilled', () => {
      const action = {
        type: leaveReportService.creditedYearDetails.fulfilled.type,
        payload: mockCreditYearData,
      }
      const state = reducer(initialLeaveReportState, action)
      expect(state).toEqual({
        leaveSummaries: { list: [], size: 0, name: '', length: 0 },
        selectFinancialYear: mockCreditYearData,
        isLoading: ApiLoadingState.succeeded,
        error: null,
        financialYear: 0,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "success" if searchLeaveSummaries is fulfilled', () => {
      const action = {
        type: leaveReportService.searchLeaveSummaries.fulfilled.type,
        payload: mockLeaveReportData,
      }
      const state = reducer(initialLeaveReportState, action)
      expect(state).toEqual({
        leaveSummaries: mockLeaveReportData,
        selectFinancialYear: [],
        isLoading: ApiLoadingState.succeeded,
        error: null,
        financialYear: 0,
        listSize: 0,
      })
    })
  })
})
