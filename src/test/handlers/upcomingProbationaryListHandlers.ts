import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import { mockUpcomingProvisionList } from '../data/upcomingProbationaryListData'

export const upcomingProbationaryListHandlers = [
  // getEmployeesUnderProbationPeriod api mock
  rest.get(
    dashboardApiConfig.getEmployeesUnderProbationPeriod,
    (_req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),

  // getEmployeesUnderProbationPeriod api mock
  rest.get(
    dashboardApiConfig.getEmployeesUnderProbationPeriod,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockUpcomingProvisionList))
    },
  ),
]
