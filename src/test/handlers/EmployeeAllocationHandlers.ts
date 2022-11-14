import { rest } from 'msw'
import { employeeAllocationApiConfig } from '../../middleware/api/apiList'
import {
  mockEmployeeAllocationReport,
  mockProjectUnderEmployeesList,
} from '../data/employeeAllocationReportData'

export const employeeAllocationHandlers = [
  rest.get(
    employeeAllocationApiConfig.getEmployeeAllocationReport,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockEmployeeAllocationReport,
        }),
      )
    },
  ),

  rest.get(
    employeeAllocationApiConfig.projectUnderEmployees,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockProjectUnderEmployeesList,
        }),
      )
    },
  ),
]
