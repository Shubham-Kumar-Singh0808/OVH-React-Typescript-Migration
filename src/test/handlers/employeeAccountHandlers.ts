import { rest } from 'msw'
import { employeeAccountsApiConfig } from '../../middleware/api/apiList'

export const employeeAccountHandlers = [
  rest.get(employeeAccountsApiConfig.financeDetails, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]
