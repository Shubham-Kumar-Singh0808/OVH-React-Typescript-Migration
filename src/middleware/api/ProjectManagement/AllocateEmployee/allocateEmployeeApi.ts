import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { allocateEmployeeApiConfig, AllowedHttpMethods } from '../../apiList'
import {
  AllocateEmployeeToProject,
  GetAllEmployeesNames,
  GetAllProjects,
} from '../../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'

const getAllEmployeesProfileData = async (): Promise<
  GetAllEmployeesNames[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: allocateEmployeeApiConfig.getAllEmployeeProfiles,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const getAllProjectSearchData = async (
  searchString: string,
): Promise<GetAllProjects[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: allocateEmployeeApiConfig.getAllProjectSearch,
    method: AllowedHttpMethods.get,
    params: { searchStr: searchString },
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const allocateNewEmployee = async (
  allocateEmployeeDetails: AllocateEmployeeToProject,
): Promise<AllocateEmployeeToProject> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: allocateEmployeeApiConfig.allocateNewEmployee,
    method: AllowedHttpMethods.post,
    data: allocateEmployeeDetails,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const allocateEmployeeApi = {
  getAllEmployeesProfileData,
  getAllProjectSearchData,
  allocateNewEmployee,
}

export default allocateEmployeeApi
