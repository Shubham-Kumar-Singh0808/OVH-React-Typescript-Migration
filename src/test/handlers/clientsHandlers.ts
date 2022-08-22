import { rest } from 'msw'
import { clientsApiConfig } from '../../middleware/api/apiList'
import { mockClientsData, mockProjectsUnderClient } from '../data/clientsData'

export const clientsHandlers = [
  // getAllClients api mock
  rest.get(clientsApiConfig.getClients, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockClientsData,
      }),
    )
  }),
  // projectsUnderClient api mock
  rest.get(clientsApiConfig.getProjectsUnderClient, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockProjectsUnderClient,
      }),
    )
  }),
]
