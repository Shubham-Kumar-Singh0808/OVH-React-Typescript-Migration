import { rest } from 'msw'
import { leaveSummaryApiConfig } from '../../middleware/api/apiList'
import { mockLeaveHistory } from '../data/leaveHistoryData'

export const employeeLeaveHistoryHandlers = [
  // getAllLeaveHistory api mock
  rest.get(leaveSummaryApiConfig.getEmployeeLeaveHistory, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  // getAllLeaveHistory api mock
  rest.get(leaveSummaryApiConfig.getEmployeeLeaveHistory, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockLeaveHistory))
  }),
]
