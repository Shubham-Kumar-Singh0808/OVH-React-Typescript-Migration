import {
  getDepartmentNames,
  getEmpDepartments,
  IndividualKra,
} from '../../../../types/Settings/Configurations/assignTemplateTypes'
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

const getDesignationId = async (id: number): Promise<getDepartmentNames> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.designationDeptId,
    method: AllowedHttpMethods.get,
    params: {
      deptId: id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getCycleId = async (newId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.alreadyExistNewCycleId,
    method: AllowedHttpMethods.get,
    params: {
      newCycleId: newId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getDesignationWiseKRAs = async ({
  departmentId,
  designationId,
}: {
  departmentId: number
  designationId: number
}): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.getDesignationWiseKRAs,
    method: AllowedHttpMethods.get,
    params: {
      departmentId,
      designationId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getUnderKras = async (): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.getDesignationNumber,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const copyCycleData = async ({
  newCycleId,
  oldCycleId,
}: {
  newCycleId: number
  oldCycleId: number
}): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.copyTheCycleData,
    method: AllowedHttpMethods.post,
    params: {
      newCycleId,
      oldCycleId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const kpisForIndividualKra = async ({
  kraId,
}: {
  kraId: number
}): Promise<IndividualKra> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.kpisForIndividualKra,
    method: AllowedHttpMethods.get,
    params: {
      kraId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const assignTemplateApi = {
  getAllEmpDepartments,
  getDesignationId,
  getCycleId,
  getDesignationWiseKRAs,
  getUnderKras,
  copyCycleData,
  kpisForIndividualKra,
}

export default assignTemplateApi
