import {
  BankInformation,
  Finance,
  UploadPanDetail,
} from '../../../../types/Finance/PanDetails/panDetailsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, panDetailsApiConfig } from '../../apiList'

const bankInformation = async (props: {
  key: string
  value: number
}): Promise<BankInformation> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: panDetailsApiConfig.bankInformation,
    method: AllowedHttpMethods.get,
    params: {
      [props.key]: props.value,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const uploadEmployeeFinanceDetails = async (
  prepareObject: UploadPanDetail,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: panDetailsApiConfig.uploadEmployeeFinanceDetails,
    method: AllowedHttpMethods.post,
    data: prepareObject.file,
    params: {
      financeId: prepareObject.financeId,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateFinanceInformation = async (list: Finance): Promise<Finance> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: panDetailsApiConfig.updateFinanceInformation,
    method: AllowedHttpMethods.post,
    data: list,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const panDetailsApi = {
  bankInformation,
  updateFinanceInformation,
  uploadEmployeeFinanceDetails,
}

export default panDetailsApi
