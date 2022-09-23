import { rest } from 'msw'
import { clientInformationApiConfig } from '../../middleware/api/apiList'
import { mockClientInformation } from '../data/clientInformationData'

export const clientInformationHandlers = [
  // getClientInformation api mock
  rest.get(
    clientInformationApiConfig.getClientInformation,
    (_req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),
  // getClientInformation api mock
  rest.get(
    clientInformationApiConfig.getClientInformation,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockClientInformation))
    },
  ),
]
