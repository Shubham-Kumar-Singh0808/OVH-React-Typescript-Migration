import { IncomingAchievementTypes } from '../../../types/Achievements/commonAchievementTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { AllowedHttpMethods, CommonAchievementsApiConfig } from '../apiList'

const getAllAchievements = async (): Promise<IncomingAchievementTypes> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CommonAchievementsApiConfig.getAllAchievementsType,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const commonAchievementsApi = {
  getAllAchievements,
}

export default commonAchievementsApi
