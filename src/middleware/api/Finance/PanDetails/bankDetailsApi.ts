import {
  BankNameLookup,
  SaveData,
} from '../../../../types/Finance/PanDetails/bankDetailsTypes'
import { BankInfo } from '../../../../types/Finance/PanDetails/panDetailsTypes'
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

const updateBankInformation = async (info: BankInfo): Promise<BankInfo> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bankDetailsApiConfig.updateBankInformation,
    method: AllowedHttpMethods.post,
    data: info,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteBankAccount = async (id: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: bankDetailsApiConfig.deleteBankAccount,
    method: AllowedHttpMethods.get,
    params: {
      bankId: id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const bankDetailsApi = {
  bankNameList,
  saveBankInformation,
  updateBankInformation,
  deleteBankAccount,
}

export default bankDetailsApi
