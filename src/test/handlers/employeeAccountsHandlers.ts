import { rest } from 'msw'
import { employeeAccountsApiConfig } from '../../middleware/api/apiList'
import { mockEmployeeAccount } from '../data/employeeAccountData'

export const employeeAccountsHandlers = [
  rest.get(employeeAccountsApiConfig.financeDetails, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockEmployeeAccount },
      }),
    )
  }),
  rest.get(employeeAccountsApiConfig.exportFinanceList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]
