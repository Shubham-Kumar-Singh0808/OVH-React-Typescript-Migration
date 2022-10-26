import { rest } from 'msw'
import { addNewClientApiConfig } from '../../middleware/api/apiList'
import { mockClientCountries } from '../data/addNewClientData'

export const addNewClientHandlers = [
  // addClient api mock
  rest.post(addNewClientApiConfig.addNewClient, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  rest.get(addNewClientApiConfig.getClientCountries, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockClientCountries },
      }),
    )
  }),
  rest.get(addNewClientApiConfig.checkClientOrgExist, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
      }),
    )
  }),
]
