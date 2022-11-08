import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import { mockJobOpenings } from '../data/jobOpeningsData'

export const jobOpeningsHandlers = [
  // getAllJobVacancies api mock
  rest.get(dashboardApiConfig.getAllJobVacancies, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  // getAllJobVacancies api mock
  rest.get(dashboardApiConfig.getAllJobVacancies, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockJobOpenings))
  }),
]
