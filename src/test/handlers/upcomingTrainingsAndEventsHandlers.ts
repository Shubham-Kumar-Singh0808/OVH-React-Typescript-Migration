import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import {
  mockUpcomingEvents,
  mockUpcomingTrainings,
} from '../data/trainingsAndEventsData'

export const birthdaysListHandlers = [
  // getUpcomingTrainings api mock
  rest.get(dashboardApiConfig.getUpcomingTrainings, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  // getUpcomingTrainings api mock
  rest.get(dashboardApiConfig.getUpcomingTrainings, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUpcomingTrainings))
  }),

  //getUpcomingEvents api mock
  rest.get(dashboardApiConfig.getUpcomingEvents, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  //getUpcomingEvents api mock
  rest.get(dashboardApiConfig.getUpcomingEvents, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUpcomingEvents))
  }),
]
