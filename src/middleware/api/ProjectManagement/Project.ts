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
import {
  ProjectDetails,
  ProjectReportQueryParams,
} from '../../../types/ProjectManagement/Project/ProjectTypes'
import {
  ExportListParams,
  ProjectDetails as ProjectInfo,
} from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'

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

const getActiveProjectReports = async (
  queryParams: ProjectReportQueryParams,
): Promise<ProjectDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.getActiveProjectReports,
    method: AllowedHttpMethods.get,
    params: queryParams,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getSearchAllocationReport = async (
  queryParams: ProjectReportQueryParams,
): Promise<ProjectDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.getSearchAllocationReport,
    method: AllowedHttpMethods.get,
    params: queryParams,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getClientProjects = async (projectId: string): Promise<ProjectInfo[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.getClientProjects,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const closeProjectReport = async (projectId: string): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.getCloseProject,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteProjectReport = async (projectid: string): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.getDeleteProject,
    method: AllowedHttpMethods.get,
    params: {
      projectid,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deallocateProjectReport = async (
  projectDetails: ProjectInfo,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.postDeallocateProject,
    method: AllowedHttpMethods.post,
    data: projectDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateProjectReport = async (
  projectDetails: ProjectInfo,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.postUpdateAllocateProject,
    method: AllowedHttpMethods.post,
    data: projectDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const exportProjectList = async (
  props: ExportListParams,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectManagementConfig.exportProjectList,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: props.employeeId,
      projectStatus: props.projectStatus,
      type: props.type,
      health: props.health,
      startdate: props.startdate ?? '',
      enddate: props.enddate ?? '',
      multiSearch: props.multiSearch ?? '',
      projectDatePeriod: props.projectDatePeriod ?? '',
      intrnalOrNot: props.intrnalOrNot,
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddProject = {
  addProject,
  closeProjectReport,
  deleteProjectReport,
  deallocateProjectReport,
  updateProject,
  updateProjectReport,
  getAllPlatforms,
  getAllDomains,
  getAllManagers,
  getProject,
  getProjectClients,
  getActiveProjectReports,
  getSearchAllocationReport,
  getClientProjects,
  exportProjectList,
}

export default AddProject
