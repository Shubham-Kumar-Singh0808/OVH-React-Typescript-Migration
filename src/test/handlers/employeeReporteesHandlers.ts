import { rest } from 'msw'
import { employeeReporteesApiConfig } from '../../middleware/api/apiList'
import {
  mockReporteesDetails,
  mockReporteesKRAs,
} from '../data/employeeReporteesData'

export const employeeReviewsHandlers = [
  rest.get(employeeReporteesApiConfig.getEmployeeReportees, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  rest.get(employeeReporteesApiConfig.getEmployeeReportees, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockReporteesDetails))
  }),
]

export const employeeReviewsKRAsHandlers = [
  rest.get(
    employeeReporteesApiConfig.getEmployeeReporteesKRAs,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),

  rest.get(
    employeeReporteesApiConfig.getEmployeeReporteesKRAs,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockReporteesKRAs))
    },
  ),
]
