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
  rest.get(`${clientsApiConfig.editClient}/{18}`, (_req, res, ctx) => {
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
  // rest.get(clientsApiConfig.clientOrg, (_req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       status: 200,
  //       data: true,
  //     }),
  //   )
  // }),
  // update Client
  rest.put(clientsApiConfig.updateClient, (req, res, ctx) => {
    const parsedJson = JSON.parse(req.body as string)
    console.log('@@@@', parsedJson)
    const filteredClient = mockClientsData.clients.find(
      (crrClient) => crrClient.name === parsedJson.name,
    )
    if (filteredClient) {
      return res(
        ctx.status(200),
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    } else {
      return res(ctx.status(500))
    }
  }),
  // update Client rejected
  rest.put(clientsApiConfig.updateClient, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  }),
  // isOrganizationExists
  rest.get(clientsApiConfig.clientOrg, (req, res, ctx) => {
    const organization = req.url.searchParams.get('organization')
    console.log('$$$$', organization)
    const filteredOrganization = mockClientsData.clients.find(
      (currClient) => currClient.organization === organization,
    )
    if (filteredOrganization) {
      return res(
        ctx.delay(100),
        ctx.json({
          status: 200,
          data: true,
        }),
      )
    } else {
      return res(
        ctx.delay(100),
        ctx.json({
          status: 200,
          data: false,
        }),
      )
    }
  }),
]
