import { rest } from 'msw'
import { leaveSummaryApiConfig } from '../../middleware/api/apiList'
import { mockLeaveHistory } from '../data/leaveHistoryData'

export const employeeLeaveSummaryHandlers = [
  // getAllLeaveSummary api mock
  rest.get(leaveSummaryApiConfig.getEmployeeLeaveSummary, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  // getAllLeaveSummary api mock
  rest.get(leaveSummaryApiConfig.getEmployeeLeaveSummary, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockLeaveHistory))
  }),
]
