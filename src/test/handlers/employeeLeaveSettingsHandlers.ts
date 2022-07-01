import { rest } from 'msw'
import { employeeLeaveSettingsApiConfig } from '../../middleware/api/apiList'
import {
  mockLeaveCalenderSettingsType,
  mockLeaveCategoriesType,
} from '../data/employeeLeaveSettingsData'

export const categoryListHandlers = [
  // addLeaveCalender api mock
  rest.get(
    employeeLeaveSettingsApiConfig.getLeaveCalenderSettings,
    (req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    },
  ),
  rest.get(
    employeeLeaveSettingsApiConfig.getLeaveCalenderSettings,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json(mockLeaveCalenderSettingsType))
    },
  ),
  // getLeaveCategories api mock
  rest.get(
    employeeLeaveSettingsApiConfig.getLeaveCategories,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockLeaveCategoriesType))
    },
  ),
]
