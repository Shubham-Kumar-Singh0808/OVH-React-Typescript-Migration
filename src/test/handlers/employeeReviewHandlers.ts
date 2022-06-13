import { reviewsTabApiConfig } from '../../middleware/api/apiList'
import { mockReviewDetails } from '../data/employeeReviewsData'
import { rest } from 'msw'

export const reviewDetailsHandlers = [
  // getAllCertifications api mock
  rest.get(reviewsTabApiConfig.getEmployeeReviews, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  rest.get(reviewsTabApiConfig.getEmployeeReviews, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockReviewDetails))
  }),
]
