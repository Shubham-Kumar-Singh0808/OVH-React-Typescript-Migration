import { KPIs, KRAs } from '../../../../types/Performance/MyKRAs/myKRAsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, myKRAsApiConfig } from '../../apiList'

const getKRAForIndividualEmployee = async (
  personId: number,
): Promise<KRAs[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myKRAsApiConfig.getKRAForIndividualEmployee,
    method: AllowedHttpMethods.get,
    params: {
      personId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getKPIsForIndividualEmployee = async (kraId: number): Promise<KPIs[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myKRAsApiConfig.getKPIsForIndividualEmployee,
    method: AllowedHttpMethods.get,
    params: {
      kraId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const myKRAsApi = {
  getKRAForIndividualEmployee,
  getKPIsForIndividualEmployee,
}
