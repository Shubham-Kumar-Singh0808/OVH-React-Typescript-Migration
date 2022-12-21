import {
  ProjectDetail,
  ProjectViewDetails,
} from '../../../../types/ProjectManagement/Project/ProjectView/projectViewTypes'
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

const getProject = async (projectid: number): Promise<ProjectDetail> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectViewApiConfig.getProject,
    method: AllowedHttpMethods.get,
    params: {
      projectid,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const projectDetailsApi = {
  getProjectDetails,
  getProject,
}

export default projectDetailsApi
