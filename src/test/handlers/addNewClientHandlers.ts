import { rest } from 'msw'
import { addNewClientApiConfig } from '../../middleware/api/apiList'

export const categoryListHandlers = [
  // addClient api mock
  rest.get(addNewClientApiConfig.addNewClient, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]
