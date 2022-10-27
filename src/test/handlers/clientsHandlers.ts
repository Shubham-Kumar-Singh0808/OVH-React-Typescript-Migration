import { rest } from 'msw'
import { clientsApiConfig } from '../../middleware/api/apiList'
import { mockClientsData, mockProjectsUnderClient } from '../data/clientsData'
import { mockEditClient, mockGetClientCountries } from '../data/editClientData'

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
  // edit client api mock
  rest.get(`${clientsApiConfig.editClient}/${18}`, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockEditClient,
      }),
    )
  }),
  // client countries api mock
  rest.get(clientsApiConfig.getClientCountries, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockGetClientCountries,
      }),
    )
  }),
  // is client organization api mock
  rest.get(clientsApiConfig.clientOrg, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: false,
      }),
    )
  }),
  // update Client success
  rest.put(clientsApiConfig.updateClient, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  // update Client rejected
  rest.put(clientsApiConfig.updateClient, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 500,
        data: {},
      }),
    )
  }),
]
