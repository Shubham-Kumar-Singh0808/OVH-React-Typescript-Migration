import { getEmpDepartments } from '../../../../types/Settings/Configurations/assignTemplateTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, assignTemplateApiConfig } from '../../apiList'

const getAllEmpDepartments = async (): Promise<getEmpDepartments[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.getEmpDepartments,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const designationId = async (id: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.designationdeptId,
    method: AllowedHttpMethods.get,
    params: {
      deptId: id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const cycleId = async (newId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.alreadyExistnewCycleId,
    method: AllowedHttpMethods.get,
    params: {
      newCycleId: newId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const designationWiseKRAs = async ({
  departmentId,
  designationId,
}: {
  departmentId: number
  designationId: number
}): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.alreadyExistnewCycleId,
    method: AllowedHttpMethods.get,
    params: {
      departmentID: departmentId,
      designationID: designationId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const assignTemplateApi = {
  getAllEmpDepartments,
  designationId,
  cycleId,
  designationWiseKRAs,
}

export default assignTemplateApi
