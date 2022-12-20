import { ProjectViewDetails } from '../../../../types/ProjectManagement/Project/ProjectView/projectViewTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { projectViewApiConfig, AllowedHttpMethods } from '../../apiList'

const getProjectDetails = async (
  projectId: number,
): Promise<ProjectViewDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectViewApiConfig.getProjects,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const projectDetailsApi = {
  getProjectDetails,
}

export default projectDetailsApi
