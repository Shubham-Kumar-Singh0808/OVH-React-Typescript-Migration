import { AllowedHttpMethods, employeeProjectsApiConfig } from '../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  ProjectClients,
  ProjectDetail,
} from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'

const getProjectClients = async (): Promise<ProjectClients[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeProjectsApiConfig.getProjectsClients,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addProject = async (
  addProjectDetails: ProjectDetail,
): Promise<ProjectDetail> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeProjectsApiConfig.addProject,
    method: AllowedHttpMethods.post,
    data: addProjectDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const AddProject = {
  addProject,
  getProjectClients,
}

export default AddProject
