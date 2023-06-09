import { IncomingEmployeeSeparationForm } from '../../../../types/MyProfile/Separation/separationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, MyProfileSeparationApiConfig } from '../../apiList'

const getEmployeeSeparationForm = async (
  employeeId: number,
): Promise<IncomingEmployeeSeparationForm> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: MyProfileSeparationApiConfig.getEmployeeSeparationForm,
    method: AllowedHttpMethods.get,
    params: {
      employeeId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const SeparationApi = {
  getEmployeeSeparationForm,
}

export default SeparationApi
