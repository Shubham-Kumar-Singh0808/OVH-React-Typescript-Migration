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
  rest.get(clientsApiConfig.editClient, (req, res, ctx) => {
    const clientId = req.url.searchParams.get('clientId')
    if (clientId) {
      return res(
        ctx.json({
          status: 200,
          data: mockEditClient,
        }),
      )
    } else {
      return res(ctx.status(500))
    }
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

  // update Client
  rest.post(clientsApiConfig.updateClient, (req, res, ctx) => {
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

  // isOrganizationExists
  rest.get(clientsApiConfig.clientOrg, (req, res, ctx) => {
    const organization = req.url.searchParams.get('organization')
    console.log('$$$$', organization)
    const filteredOrganization = mockClientsData.clients.find(
      (currClient) => currClient.organization === organization,
    )
    console.log('****', filteredOrganization)
    if (filteredOrganization !== undefined) {
      return res(
        ctx.status(200),
        ctx.json({
          data: true,
        }),
      )
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          data: false,
        }),
      )
    }
  }),
  rest.put(clientsApiConfig.updateClient, (req, res, ctx) => {
    // const { name } = req.body
    console.log('@@@@@@@@', req.body)
    // const filteredClient = mockClientsData.clients.find(
    //   (currClient) => currClient.name === name,
    // )
    const filteredClient = true
    if (filteredClient) {
      return res(
        ctx.status(500),
        ctx.json({
          message: 'Client Name Already Exists',
        }),
      )
    } else {
      return res(ctx.status(200), ctx.json({}))
    }
  }),
]
