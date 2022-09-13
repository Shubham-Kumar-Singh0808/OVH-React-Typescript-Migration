import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import { mockAchievementsList } from '../data/employeeAchievementsData'

export const employeeAchievementsHandlers = [
  // getAllAchievements api mock
  rest.get(dashboardApiConfig.getAllAchievements, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  // getAllAchievements api mock
  rest.get(dashboardApiConfig.getAllAchievements, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAchievementsList))
  }),
]
