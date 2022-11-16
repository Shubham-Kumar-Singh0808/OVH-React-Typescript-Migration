import { rest } from 'msw'
import { leaveApprovalsApiConfig } from '../../middleware/api/apiList'
import { mockEmployeeList } from '../data/employeeListData'
import {
  mockEmployeesLeaves,
  mockSearchEmployeesLeaves,
} from '../data/leaveApprovalsData'

export const leaveApprovalsHandlers = [
  // search employee leaves api mock
  rest.post(leaveApprovalsApiConfig.getSearchEmployees, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockSearchEmployeesLeaves,
      }),
    )
  }),
  // employee leaves api mock
  rest.get(leaveApprovalsApiConfig.getEmployeeLeaves, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockEmployeesLeaves,
      }),
    )
  }),
  rest.get(
    leaveApprovalsApiConfig.checkProjectManagerExits,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: false,
        }),
      )
    },
  ),
  // get employees api mock
  rest.get(leaveApprovalsApiConfig.getEmployees, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockEmployeeList,
      }),
    )
  }),
]
