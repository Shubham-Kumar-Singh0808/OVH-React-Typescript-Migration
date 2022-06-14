import { employeeMyAssetsApiConfig } from '../../middleware/api/apiList'
import { mockAssetsDetails } from '../data/employeeAssetsData'
import { rest } from 'msw'

export const reviewDetailsHandlers = [
  // getAllCertifications api mock
  rest.get(employeeMyAssetsApiConfig.getEmployeeAssets, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  rest.get(employeeMyAssetsApiConfig.getEmployeeAssets, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAssetsDetails))
  }),
]
