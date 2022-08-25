import {
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

const clientsApi = {
  getClients,
  getProjectsUnderClient,
  searchClients,
  deleteClient,
}

export default clientsApi
