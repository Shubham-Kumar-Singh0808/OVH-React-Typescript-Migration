import { rest } from 'msw'
import { employeeHandbookSettingsApiConfig } from '../../middleware/api/apiList'
import {
  mockCountries,
  mockHandbookData,
  mockHandbookDetails,
  mockSelectedCountries,
} from '../data/handbookTotalListData'

export const employeeHandbookSettingsHandlers = [
  // getAllHandbookListApi mock
  rest.get(
    employeeHandbookSettingsApiConfig.getEmployeeHandbooks,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: { list: mockHandbookData.list },
        }),
      )
    },
  ),
  // getAllCountries APi mock
  rest.get(
    employeeHandbookSettingsApiConfig.getEmployeeCountries,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockCountries,
        }),
      )
    },
  ),
  //getTotalList APi mock
  rest.get(
    employeeHandbookSettingsApiConfig.getTotalHandbookList,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockHandbookData,
        }),
      )
    },
  ),
  //deleteHandbook APi mock
  rest.get(
    employeeHandbookSettingsApiConfig.deleteEmployeeHandbook,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
        }),
      )
    },
  ),
  //getAllSelected countries API mock
  rest.get(
    employeeHandbookSettingsApiConfig.getSelectedCountries,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockSelectedCountries,
        }),
      )
    },
  ),
  //addNewHandbookApi mock
  rest.get(
    employeeHandbookSettingsApiConfig.addNewHandbook,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    },
  ),
  //updateHandbookApi mock
  rest.get(
    employeeHandbookSettingsApiConfig.updateEmployeeHandbook,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockHandbookDetails,
        }),
      )
    },
  ),
]
