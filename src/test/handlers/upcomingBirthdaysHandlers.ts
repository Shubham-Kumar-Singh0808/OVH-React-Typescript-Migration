import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import { mockUpcomingBirthdays } from '../../test/data/upcomingBirthdaysData'

export const birthdaysListHandlers = [
  // getAllUpcomingBirthdays api mock
  rest.get(
    dashboardApiConfig.getUpcomingBirthdayAnniversaries,
    (_req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),

  // getAllUpcomingBirthdays api mock
  rest.get(
    dashboardApiConfig.getUpcomingBirthdayAnniversaries,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockUpcomingBirthdays))
    },
  ),
]
