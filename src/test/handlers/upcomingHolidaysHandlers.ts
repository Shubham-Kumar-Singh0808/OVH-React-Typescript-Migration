import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import {
  mockAddNewHoliday,
  mockUpcomingHolidays,
} from '../data/upcomingHolidaysData'

export const birthdaysListHandlers = [
  // addHoliday api mock
  rest.get(dashboardApiConfig.addHoliday, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  // addHoliday api mock
  rest.get(dashboardApiConfig.addHoliday, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAddNewHoliday))
  }),

  //getUpcomingHolidays api mock
  rest.get(dashboardApiConfig.getUpcomingHolidays, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  //getUpcomingHolidays api mock
  rest.get(dashboardApiConfig.getUpcomingHolidays, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUpcomingHolidays))
  }),
]
