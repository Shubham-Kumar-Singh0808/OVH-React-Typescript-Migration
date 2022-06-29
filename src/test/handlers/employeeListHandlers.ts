import { rest } from 'msw'
import { employeeListConfig } from '../../middleware/api/apiList'
import { mockEmployeeList } from '../data/employeeListData'

export const employeeListHandlers = [
  // addNewSkillForCategory api mock
  rest.get(employeeListConfig.getEmployeeList, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { emps: mockEmployeeList },
      }),
    )
  }),
]
