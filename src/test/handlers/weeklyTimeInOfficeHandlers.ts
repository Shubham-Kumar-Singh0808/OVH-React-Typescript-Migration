import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import { mockWeeklyTimeInOffice } from '../data/weeklyTimeInOfficeData'

export const timeInOfficeHandlers = [
  //getEmployeeTimeInOffice api mock
  rest.get(dashboardApiConfig.getEmployeeTimeInOffice, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  //getEmployeeTimeInOffice api mock
  rest.get(dashboardApiConfig.getEmployeeTimeInOffice, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockWeeklyTimeInOffice))
  }),
]
