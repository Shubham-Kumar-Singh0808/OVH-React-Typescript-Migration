import { rest } from 'msw'
import { dashboardApiConfig } from '../../middleware/api/apiList'
import { mockSearchEmployee } from '../data/employeeProfileDate'

export const employeeSearchHandler = [
  // getAllEmployees api mock
  rest.get(dashboardApiConfig.searchEmployee, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockSearchEmployee,
      }),
    )
  }),
]
