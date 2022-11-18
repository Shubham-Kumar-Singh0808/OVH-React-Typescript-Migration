import { GetAppraisalCycle } from '../../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import {
  Designations,
  DesignationWiseKRA,
  EmpDepartments,
  KpiForIndividualKra,
  SearchKRAData,
} from '../../../../types/Settings/Configurations/assignTemplateTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, assignTemplateApiConfig } from '../../apiList'

const getAllEmpDepartments = async (): Promise<EmpDepartments[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.getEmpDepartments,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getDesignations = async (id: number): Promise<Designations[]> => {
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

const isCycleAlreadyExist = async (newId: number): Promise<boolean> => {
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
}): Promise<DesignationWiseKRA[]> => {
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

const searchKRAData = async ({
  departmentId,
  designationId,
  endIndex,
  multipleSearch,
  startIndex,
}: {
  departmentId: number
  designationId: number
  endIndex: number
  multipleSearch: string
  startIndex: number
}): Promise<SearchKRAData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.searchKRAData,
    method: AllowedHttpMethods.post,
    data: {
      departmentId,
      designationId,
      endIndex,
      multipleSearch,
      startIndex,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const kpisForIndividualKra = async (
  kraId: number | string,
): Promise<KpiForIndividualKra[]> => {
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

const designingMaping = async ({
  appraisalCycleDto,
  designation,
  kraLookups,
}: {
  appraisalCycleDto: GetAppraisalCycle
  designation: Designations
  kraLookups: DesignationWiseKRA[]
}): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assignTemplateApiConfig.designingMaping,
    method: AllowedHttpMethods.post,
    data: {
      appraisalCycleDto,
      designation,
      kraLookups,
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

const assignTemplateApi = {
  getAllEmpDepartments,
  getDesignations,
  isCycleAlreadyExist,
  getDesignationWiseKRAs,
  getUnderKras,
  copyCycleData,
  kpisForIndividualKra,
  searchKRAData,
  designingMaping,
}

export default assignTemplateApi
