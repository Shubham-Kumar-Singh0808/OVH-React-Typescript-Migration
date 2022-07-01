import { rest } from 'msw'
import { employeeHandbookSettingsApiConfig } from '../../middleware/api/apiList'
import { mockEmployeeHandbookList } from '../data/employeeHandbookSettingsData'

export const employeeListHandlers = [
  // getAllHandbookListapi mock
  rest.get(
    employeeHandbookSettingsApiConfig.getEmployeeHandbooks,
    (req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: { list: mockEmployeeHandbookList },
        }),
      )
    },
  ),
]
