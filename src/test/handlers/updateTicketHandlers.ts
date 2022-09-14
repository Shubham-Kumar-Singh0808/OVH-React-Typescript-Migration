import { rest } from 'msw'
import { updateTicketApiConfig } from '../../middleware/api/apiList'
import {
  mockActiveEmployees,
  mockTicketDetailsToEdit,
} from '../data/updateTicketData'

export const updateTicketHandlers = [
  // getTicketToEdit api mock
  rest.get(updateTicketApiConfig.getTicket, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockTicketDetailsToEdit,
      }),
    )
  }),
  // getActiveEmployeeList api mock
  rest.get(updateTicketApiConfig.getActiveEmployeeList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockActiveEmployees,
      }),
    )
  }),
]
