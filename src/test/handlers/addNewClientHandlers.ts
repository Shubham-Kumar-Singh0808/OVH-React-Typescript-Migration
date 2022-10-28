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
  // addClient api mock for status:406
  rest.post(addNewClientApiConfig.addNewClient, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 406,
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
  //checkClientOrganizationExist api mock
  rest.get(addNewClientApiConfig.checkClientOrgExist, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: true,
      }),
    )
  }),
  //checkClientOrganizationExist api mock
  rest.get(addNewClientApiConfig.checkClientOrgExist, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: false,
      }),
    )
  }),
]
