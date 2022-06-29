import { employeeLeaveSettingsConfig } from '../../middleware/api/apiList'
import {
  mockLeaveCalenderSettingsType,
  mockLeaveCategoriesType,
} from '../data/employeeLeaveSettingsData'

import { rest } from 'msw'

export const categoryListHandlers = [
  // addLeaveCalender api mock
  rest.get(
    employeeLeaveSettingsConfig.getLeaveCalenderSettings,
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
    employeeLeaveSettingsConfig.getLeaveCalenderSettings,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json(mockLeaveCalenderSettingsType))
    },
  ),
  // getLeaveCategories api mock
  rest.get(employeeLeaveSettingsConfig.getLeaveCategories, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockLeaveCategoriesType))
  }),
]
