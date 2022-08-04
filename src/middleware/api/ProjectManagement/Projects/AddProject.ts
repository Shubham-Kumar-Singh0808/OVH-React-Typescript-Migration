import { AllowedHttpMethods, employeeProjectsApiConfig } from '../../apiList'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { ProjectClients } from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'

const getProjectClients = async (): Promise<ProjectClients[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeProjectsApiConfig.getProjectsClients,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddProject = {
  getProjectClients,
}

export default AddProject
