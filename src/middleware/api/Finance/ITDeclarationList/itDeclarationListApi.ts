import { Cycle } from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, itDeclarationListApiConfig } from '../../apiList'

const getCycles = async (): Promise<Cycle[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getCycles,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const itDeclarationListApi = {
  getCycles,
}
