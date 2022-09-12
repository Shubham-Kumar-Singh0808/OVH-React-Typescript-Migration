import { rest } from 'msw'
import { ticketReportApiConfig } from '../../middleware/api/apiList'
import {
  mockDepartmentNameData,
  mockTicketDetailsData,
  mockTicketReportData,
} from '../data/ticketReportsData'

export const ticketReportHandlers = [
  // getAllClients api mock
  rest.get(ticketReportApiConfig.getDepartmentNameList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockDepartmentNameData,
      }),
    )
  }),

  rest.get(ticketReportApiConfig.getTicketsReport, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockTicketReportData,
      }),
    )
  }),

  rest.get(ticketReportApiConfig.getTicketsDetails, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockTicketDetailsData,
      }),
    )
  }),
]
