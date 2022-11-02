import { getEmpDepartments } from '../../../../../types/Settings/Configurations/assignTemplateTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  getEmpDepartmentsApiConfig,
} from '../../../apiList'

const getAllEmpDepartments = async (): Promise<getEmpDepartments[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getEmpDepartmentsApiConfig.getEmpDepartments,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const designationId = async (deptId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getEmpDepartmentsApiConfig.designationdeptId,
    method: AllowedHttpMethods.get,
    params: {
      id: deptId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const assignTemplateApi = {
  getAllEmpDepartments,
  designationId,
}

export default assignTemplateApi
