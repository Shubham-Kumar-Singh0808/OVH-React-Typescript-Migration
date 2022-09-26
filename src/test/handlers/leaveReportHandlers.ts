import { rest } from 'msw'
import { leaveReportsApiConfig } from '../../middleware/api/apiList'
import {
  mockCreditYearData,
  mockLeaveReportData,
} from '../data/LeaveReportData'

export const employeeListHandlers = [
  rest.get(leaveReportsApiConfig.getLeaveSummaries, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockLeaveReportData,
      }),
    )
  }),
  rest.get(leaveReportsApiConfig.creditedYears, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockCreditYearData,
      }),
    )
  }),
  // eslint-disable-next-line sonarjs/no-identical-functions
  rest.get(leaveReportsApiConfig.searchLeaveSummaries, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockLeaveReportData,
      }),
    )
  }),
  rest.get(leaveReportsApiConfig.financialYear, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
      }),
    )
  }),
]
