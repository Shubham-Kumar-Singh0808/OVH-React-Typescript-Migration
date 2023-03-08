import sqaAuditReportReducer, {
  sqaAuditReportService,
} from './sqaAuditReportSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import {
  GetAuditDetails,
  GetSQAAuditHistory,
  sqaAuditReportSliceState,
} from '../../types/SQAAuditReport/sqaAuditReportTypes'
import {
  mockSQAAuditHistoryDetails,
  mockSQAAuditReport,
  mockSQAAuditViewReport,
} from '../../test/data/sqaAuditReportData'

describe('sqaAuditReportSlice', () => {
  describe('sqaAuditReportReducer', () => {
    const initialSQAAuditReportState = {
      getSQAAuditReport: { size: 0, list: [] },
      isLoading: ApiLoadingState.idle,
      sqaAuditReportList: [],
      sqaAuditHistory: {} as GetSQAAuditHistory,
      getAuditDetails: {} as GetAuditDetails,
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
        sqaAuditHistory: {},
        getAuditDetails: {},
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
        sqaAuditHistory: {},
        getAuditDetails: {},
      })
    })

    it('Should be able to set isLoading to "loading" if getNewSQAAuditTimelineDetails is pending', () => {
      const action = {
        type: sqaAuditReportService.getNewSQAAuditTimelineDetails.pending.type,
      }
      const state = sqaAuditReportReducer(initialSQAAuditReportState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        getSQAAuditReport: { size: 0, list: [] },
        sqaAuditReportList: [],
        sqaAuditHistory: {},
        getAuditDetails: {},
      })
    })

    it('Should be able to set isLoading to "success" if getNewSQAAuditTimelineDetails is fulfilled', () => {
      const action = {
        type: sqaAuditReportService.getNewSQAAuditTimelineDetails.fulfilled,
        payload: mockSQAAuditHistoryDetails,
      }
      const state = sqaAuditReportReducer(initialSQAAuditReportState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        getSQAAuditReport: { size: 0, list: [] },
        sqaAuditReportList: [],
        sqaAuditHistory: mockSQAAuditHistoryDetails,
        getAuditDetails: {},
      })
    })

    it('Should be able to set isLoading to "loading" if getSQAAuditDetails is pending', () => {
      const action = {
        type: sqaAuditReportService.getSQAAuditDetails.pending.type,
      }
      const state = sqaAuditReportReducer(initialSQAAuditReportState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        getSQAAuditReport: { size: 0, list: [] },
        sqaAuditReportList: [],
        sqaAuditHistory: {},
        getAuditDetails: {},
      })
    })

    it('Should be able to set isLoading to "success" if getSQAAuditDetails is fulfilled', () => {
      const action = {
        type: sqaAuditReportService.getSQAAuditDetails.fulfilled,
        payload: mockSQAAuditViewReport,
      }
      const state = sqaAuditReportReducer(initialSQAAuditReportState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        getSQAAuditReport: { size: 0, list: [] },
        sqaAuditReportList: [],
        sqaAuditHistory: {},
        getAuditDetails: mockSQAAuditViewReport,
      })
    })
  })
})
