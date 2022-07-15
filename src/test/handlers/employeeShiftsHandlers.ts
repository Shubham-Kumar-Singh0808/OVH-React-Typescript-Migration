/* eslint-disable sonarjs/no-identical-functions */
// Todo: remove eslint and fix error
import { rest } from 'msw'
import { mockEmployeeShifts } from '../data/employeeShiftsData'
import { shiftConfigurationApiConfig } from '../../middleware/api/apiList'

export const employeeShiftsHandlers = [
  // getAllShifts api mock
  rest.get(shiftConfigurationApiConfig.getAllShifts, (_req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getAllShifts api mock
  rest.get(shiftConfigurationApiConfig.getAllShifts, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockEmployeeShifts))
  }),
  // create employee shift api mock
  rest.get(shiftConfigurationApiConfig.addTimeSlot, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  // update employee shift api mock
  rest.get(shiftConfigurationApiConfig.updateShiftDetail, (_req, res, ctx) =>
    res(
      ctx.json({
        status: 200,
        data: {},
      }),
    ),
  ),
  // delete employee shift api mock
  rest.get(shiftConfigurationApiConfig.deleteShiftDetail, (_req, res, ctx) =>
    res(
      ctx.json({
        status: 200,
        data: {},
      }),
    ),
  ),
]
