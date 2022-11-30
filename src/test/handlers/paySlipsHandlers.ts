import { rest } from 'msw'
import { paySlipsApiConfig } from '../../middleware/api/apiList'
import { mockPaySlips } from '../data/paySlipsData'

export const paySlipsHandlers = [
  rest.get(
    paySlipsApiConfig.getEmployeePayslipsForSelectedYear,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: { mockPaySlips },
        }),
      )
    },
  ),
]
