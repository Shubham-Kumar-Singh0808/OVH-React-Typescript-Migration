import {
  BankNameLookup,
  SaveData,
} from '../../../../types/Finance/PanDetails/bankDetailsTypes'
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

const saveBankInformation = async (
  data: SaveData,
): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bankDetailsApiConfig.saveBankInformation,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const bankDetailsApi = {
  bankNameList,
  saveBankInformation,
}

export default bankDetailsApi
