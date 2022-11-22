import { BankNameLookup } from '../../../../types/Finance/PanDetails/bankDetailsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, bankDetailsApiConfig } from '../../apiList'

const bankNameList = async (): Promise<BankNameLookup[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bankDetailsApiConfig.getBankNameLookup,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const bankDetailsApi = {
  bankNameList,
}

export default bankDetailsApi
