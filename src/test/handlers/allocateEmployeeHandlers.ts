import { rest } from 'msw'
import { allocateEmployeeApiConfig } from '../../middleware/api/apiList'
import {
  mockAllocateEmployeeToProject,
  mockEmployeeNames,
  mockProjectNames,
} from '../data/allocateEmployeeData'

export const allocateEmployeeHandlers = [
  // Employeenames api mock
  rest.get(
    allocateEmployeeApiConfig.getAllEmployeeProfiles,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockEmployeeNames,
        }),
      )
    },
  ),
  // projectnames api mock
  rest.get(allocateEmployeeApiConfig.getAllProjectSearch, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockProjectNames,
      }),
    )
  }),
  // newallocate api mock
  rest.get(allocateEmployeeApiConfig.allocateNewEmployee, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockAllocateEmployeeToProject,
      }),
    )
  }),
]
