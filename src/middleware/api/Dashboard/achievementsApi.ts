import { EmployeeAchievementsApiResponse } from '../../../types/Dashboard/Achievements/ServiceAwards/achievementsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { dashboardApiConfig, AllowedHttpMethods } from '../apiList'

const getAllAchievements =
  async (): Promise<EmployeeAchievementsApiResponse> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: dashboardApiConfig.getAllAchievements,
      method: AllowedHttpMethods.get,
    })
    const response = await useAxios(requestConfig)
    return response.data
  }

const achievementsApi = {
  getAllAchievements,
}

export default achievementsApi
