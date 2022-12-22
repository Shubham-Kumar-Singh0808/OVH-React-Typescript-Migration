import { ProjectHistoryResponse } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTimeLine/projectTimeLineTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import {
  projectTimeLineApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const projectHistoryDetails = async (
  projectId: number,
): Promise<ProjectHistoryResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectTimeLineApiConfig.getProjectHistory,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const projectHistoryDetailsApi = {
  projectHistoryDetails,
}

export default projectHistoryDetailsApi
