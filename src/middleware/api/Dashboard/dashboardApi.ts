import {
  EmployeeAchievementsApiResponse,
  ServiceAward,
} from '../../../types/Dashboard/Achievements/achievementTypes'
import {
  JobOpeningsApiProps,
  JobVacanciesResponse,
} from '../../../types/Dashboard/JobOpenings/JobOpeningsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { AllowedHttpMethods, dashboardApiConfig } from '../apiList'

const getAllJobVacancies = async (
  props: JobOpeningsApiProps,
): Promise<JobVacanciesResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getAllJobVacancies,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      searchJobTitle: props.searchJobTitle ?? '',
      status: props.status ?? 'open',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllAchievements =
  async (): Promise<EmployeeAchievementsApiResponse> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: dashboardApiConfig.getAllAchievements,
      method: AllowedHttpMethods.get,
    })
    const response = await useAxios(requestConfig)
    return response.data
  }
const dashboardApi = {
  getAllJobVacancies,
  getAllAchievements,
}

export default dashboardApi
