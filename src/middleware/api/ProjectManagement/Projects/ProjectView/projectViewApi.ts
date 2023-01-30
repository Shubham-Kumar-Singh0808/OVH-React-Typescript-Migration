import {
  ProjectDetail,
  ProjectViewDetails,
  UpdateProjectViewDetails,
} from '../../../../../types/ProjectManagement/Project/ProjectView/projectViewTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { projectViewApiConfig, AllowedHttpMethods } from '../../../apiList'

const getProjectDetails = async (
  projectId: number | string,
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

const getProject = async (
  projectid: number | string,
): Promise<ProjectDetail> => {
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

const updateEmployeeAllocationProject = async (
  updateEmployeeAllocation: UpdateProjectViewDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectViewApiConfig.updateProjectDetails,
    method: AllowedHttpMethods.post,
    data: updateEmployeeAllocation,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const projectDetailsApi = {
  getProjectDetails,
  getProject,
  updateEmployeeAllocationProject,
}

export default projectDetailsApi
