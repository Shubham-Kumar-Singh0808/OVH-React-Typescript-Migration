import { ClientInformation } from '../../../../../types/ProjectManagement/Clients/ClientInformation/viewClientInformationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  clientInformationApiConfig,
} from '../../../apiList'

const getClientInformation = async (id: number): Promise<ClientInformation> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: `${clientInformationApiConfig.getClientInformation}/${id}`,
    method: AllowedHttpMethods.get,
  })
  const responseVisa = await useAxios(requestConfig)
  return responseVisa.data
}

const clientInformationApi = {
  getClientInformation,
}

export default clientInformationApi
