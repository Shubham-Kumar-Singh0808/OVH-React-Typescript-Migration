import { LeaveSummary } from '../../../types/Dashboard/EarnedLeaves/earnedLeavesTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { AllowedHttpMethods, dashboardApiConfig } from '../apiList'

const getLeaveSummary = async (): Promise<LeaveSummary> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getLeaveSummary,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const earnedLeavesApi = {
  getLeaveSummary,
}

export default earnedLeavesApi
