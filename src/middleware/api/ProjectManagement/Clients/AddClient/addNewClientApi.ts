import {
  AddClientDetails,
  ClientCountry,
} from '../../../../../types/ProjectManagement/Clients/AddClient/addNewClientTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { addNewClientApiConfig, AllowedHttpMethods } from '../../../apiList'

const getClientCountries = async (): Promise<ClientCountry[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewClientApiConfig.getClientCountries,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewClient = async (
  newClientDetails: AddClientDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewClientApiConfig.addNewClient,
    method: AllowedHttpMethods.post,
    data: newClientDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const checkClientOrgExist = async (organization: string): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewClientApiConfig.checkClientOrgExist,
    method: AllowedHttpMethods.get,
    params: {
      organization,
    },
  })
  const responseVisa = await useAxios(requestConfig)
  return responseVisa.data
}

const addNewClientApi = {
  getClientCountries,
  addNewClient,
  checkClientOrgExist,
}

export default addNewClientApi
