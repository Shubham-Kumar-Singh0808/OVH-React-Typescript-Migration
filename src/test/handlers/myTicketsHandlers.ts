import { rest } from 'msw'
import { ticketListInformationApiConfig } from '../../middleware/api/apiList'
import { mockEmployeeTicketList } from '../data/ticketListData'

export const myTicketsHandlers = [
  // getAllTickets api mock
  rest.get(
    ticketListInformationApiConfig.getTicketListInformation,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockEmployeeTicketList,
        }),
      )
    },
  ),
]
