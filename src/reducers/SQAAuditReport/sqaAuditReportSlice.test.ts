import sqaAuditReportReducer, {
  sqaAuditReportService,
} from './sqaAuditReportSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { sqaAuditReportSliceState } from '../../types/SQAAuditReport/sqaAuditReportTypes'
import { mockSQAAuditReport } from '../../test/data/sqaAuditReportData'

describe('sqaAuditReportSlice', () => {
  describe('sqaAuditReportReducer', () => {
    const initialSQAAuditReportState = {
      getSQAAuditReport: { size: 0, list: [] },
      isLoading: ApiLoadingState.idle,
      sqaAuditReportList: [],
    } as sqaAuditReportSliceState

    it('Should be able to set isLoading to "loading" if getSQAAuditReport is pending', () => {
      const action = {
        type: sqaAuditReportService.getSQAAuditReport.pending.type,
      }
      const state = sqaAuditReportReducer(initialSQAAuditReportState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        getSQAAuditReport: { size: 0, list: [] },
        sqaAuditReportList: [],
      })
    })

    it('Should be able to set isLoading to "success" if getSQAAuditReport is fulfilled', () => {
      const action = {
        type: sqaAuditReportService.getSQAAuditReport.fulfilled,
        payload: mockSQAAuditReport,
      }
      const state = sqaAuditReportReducer(initialSQAAuditReportState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        getSQAAuditReport: mockSQAAuditReport,
        sqaAuditReportList: [],
      })
    })
  })
})
