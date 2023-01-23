import { GetCycleList } from '../../../../types/Performance/AppraisalTemplate/appraisalTemplateTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AppraisalTemplateApiConfig, AllowedHttpMethods } from '../../apiList'

const activeCycle = async (): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AppraisalTemplateApiConfig.activeCycle,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const cycle = async (): Promise<GetCycleList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AppraisalTemplateApiConfig.cycle,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AppraisalTemplateApi = {
  activeCycle,
  cycle,
}

export default AppraisalTemplateApi
