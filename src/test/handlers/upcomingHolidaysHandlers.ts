import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import {
  mockAddNewHoliday,
  mockEditHoliday,
  mockUpcomingHolidays,
} from '../data/upcomingHolidaysData'

export const upcomingHolidaysHandlers = [
  // addHoliday api mock
  rest.post(dashboardApiConfig.addHoliday, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  // addHoliday api mock
  rest.post(dashboardApiConfig.addHoliday, (_req, res, ctx) => {
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

  //getHolidayData api mock
  rest.get(dashboardApiConfig.getHolidayInformation, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  //getHolidayData api mock
  rest.get(
    `${dashboardApiConfig.getHolidayInformation}/${150}`,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockEditHoliday,
        }),
      )
    },
  ),

  //updateHolidayData api mock
  rest.put(dashboardApiConfig.updateHoliday, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  //updateHolidayData api mock
  rest.put(dashboardApiConfig.updateHoliday, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockEditHoliday))
  }),
  //deleteHoliday
  rest.delete(dashboardApiConfig.deleteHoliday, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]
