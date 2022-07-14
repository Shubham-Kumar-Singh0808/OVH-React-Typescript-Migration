import { rest } from 'msw'
import { hiveActivityReportApiConfig } from '../../middleware/api/apiList'
import {
  mockEmployeeHiveActivityReport,
  mockManagerHiveActivityReport,
  mockSearchHiveTime,
} from '../data/hiveActivityEmployeeManagerReportData'

export const hiveActivityReportHandlers = [
  // hive activity report api mock
  rest.get(
    hiveActivityReportApiConfig.getEmployeeHiveActivityReport,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockEmployeeHiveActivityReport,
        }),
      )
    },
  ),

  rest.get(
    hiveActivityReportApiConfig.getManagerHiveActivityReport,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockManagerHiveActivityReport,
        }),
      )
    },
  ),

  rest.get(hiveActivityReportApiConfig.getSearchHiveTime, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockSearchHiveTime,
      }),
    )
  }),

  rest.get(hiveActivityReportApiConfig.exportHiveReport, (_req, res, ctx) => {
    return res(
      ctx.json({
        data: mockManagerHiveActivityReport,
      }),
    )
  }),
]
