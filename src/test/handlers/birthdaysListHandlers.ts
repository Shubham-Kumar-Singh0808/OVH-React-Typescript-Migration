import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import { mockBirthdaysList } from '../data/birthdaysListData'

export const birthdaysListHandlers = [
  // getAllEmployeesBirthdayList api mock
  rest.get(dashboardApiConfig.getAllEmployeesBirthdayList, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  // getAllEmployeesBirthdayList api mock
  rest.get(dashboardApiConfig.getAllEmployeesBirthdayList, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockBirthdaysList))
  }),
]
