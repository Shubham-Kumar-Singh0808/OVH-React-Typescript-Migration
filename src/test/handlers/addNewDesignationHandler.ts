import { rest } from 'msw'
import { employeeDesignationListApiConfig } from '../../middleware/api/apiList'
import {
  mockAllDepartments,
  mockAllDesignation,
} from '../data/addEmployeeDesignationData'

export const addNewDesignationHandler = [
  rest.get(
    employeeDesignationListApiConfig.getEmployeeDepartments,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: { mockAllDepartments },
        }),
      )
    },
  ),
  rest.get(
    employeeDesignationListApiConfig.getEmployeeDesignations,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: { mockAllDesignation },
        }),
      )
    },
  ),
  rest.post(
    employeeDesignationListApiConfig.addEmployeeDesignation,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    },
  ),
  rest.delete(
    employeeDesignationListApiConfig.deleteEmployeeDesignation,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
        }),
      )
    },
  ),
]
