import {
  AllowedHttpMethods,
  employeeProjectsApiConfig,
  projectManagementConfig,
} from '../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import {
  Domains,
  Managers,
  PlatForms,
  Project,
  ProjectClients,
  ProjectDetail,
} from '../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'

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
    url: projectManagementConfig.addProject,
    method: AllowedHttpMethods.post,
    data: addProjectDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateProject = async (projectDetails: Project): Promise<Project> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.updateProject,
    method: AllowedHttpMethods.put,
    data: projectDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getProject = async (projectid: string): Promise<Project> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.getProject,
    method: AllowedHttpMethods.get,
    params: {
      projectid,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllPlatforms = async (): Promise<PlatForms[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.getAllPlatforms,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllDomains = async (): Promise<Domains[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.getAllDomains,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllManagers = async (): Promise<Managers[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.getAllManagers,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddProject = {
  addProject,
  updateProject,
  getAllPlatforms,
  getAllDomains,
  getAllManagers,
  getProject,
  getProjectClients,
}

export default AddProject
