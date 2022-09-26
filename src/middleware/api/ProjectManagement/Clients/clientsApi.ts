import {
  Client,
  ClientCountry,
  GetClientsProps,
  GetClientsResponse,
  ProjectsUnderClient,
} from '../../../../types/ProjectManagement/Clients/clientsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, clientsApiConfig } from '../../apiList'

const getClients = async (
  props: GetClientsProps,
): Promise<GetClientsResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: clientsApiConfig.getClients,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      selectionStatus: props.selectionStatus,
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getProjectsUnderClient = async (
  id: number,
): Promise<ProjectsUnderClient[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: clientsApiConfig.getProjectsUnderClient,
    method: AllowedHttpMethods.get,
    params: {
      clientId: id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const searchClients = async (
  props: GetClientsProps,
): Promise<GetClientsResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: clientsApiConfig.searchClients,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      search: props.searchText,
      selectionStatus: props.selectionStatus,
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteClient = async (id: number): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: clientsApiConfig.deleteClient,
    method: AllowedHttpMethods.delete,
    params: {
      clientId: id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getClientToEdit = async (clientId: number): Promise<Client> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: `${clientsApiConfig.editClient}/${clientId}`,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateClient = async (
  updatedClientDetails: Client,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: clientsApiConfig.updateClient,
    method: AllowedHttpMethods.put,
    data: updatedClientDetails,
  })
  const responseVisa = await useAxios(requestConfig)
  return responseVisa.data
}

const getClientCountries = async (): Promise<ClientCountry[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: clientsApiConfig.getClientCountries,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const isOrganizationExists = async (organization: string): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: clientsApiConfig.clientOrg,
    method: AllowedHttpMethods.get,
    params: {
      organization,
    },
  })
  const responseVisa = await useAxios(requestConfig)
  return responseVisa.data
}

const clientsApi = {
  getClients,
  getProjectsUnderClient,
  searchClients,
  deleteClient,
  getClientToEdit,
  updateClient,
  getClientCountries,
  isOrganizationExists,
}

export default clientsApi
