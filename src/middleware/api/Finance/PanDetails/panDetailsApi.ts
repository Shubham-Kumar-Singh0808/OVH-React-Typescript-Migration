import { BankInformation } from '../../../../types/Finance/PanDetails/panDetailsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, panDetailsApiConfig } from '../../apiList'

const bankInformation = async (
  loggedInEmpId: number,
): Promise<BankInformation> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: panDetailsApiConfig.bankInformation,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const panDetailsApi = {
  bankInformation,
}

export default panDetailsApi
