import { ProjectScheduleVariance } from '../../../../../../types/ProjectManagement/Project/ProjectView/ScheduleVariance/scheduleVarianceTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import {
  projectScheduleVarianceApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const getScheduleVariance = async (
  projectId: number | string,
): Promise<ProjectScheduleVariance[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectScheduleVarianceApiConfig.getScheduleVariance,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const projectScheduleVarianceApi = {
  getScheduleVariance,
}

export default projectScheduleVarianceApi
