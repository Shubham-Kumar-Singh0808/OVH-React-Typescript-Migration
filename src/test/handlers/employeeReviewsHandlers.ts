import { rest } from 'msw'
import { employeeReviewsApiConfig } from '../../middleware/api/apiList'
import { mockReviewDetails } from '../data/employeeReviewsData'

export const employeeReviewsHandlers = [
  // getAllCertifications api mock
  rest.get(employeeReviewsApiConfig.getEmployeeReviews, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  rest.get(employeeReviewsApiConfig.getEmployeeReviews, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockReviewDetails))
  }),
]
