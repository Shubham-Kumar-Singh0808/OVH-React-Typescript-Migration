import {
  DeleteKPIParams,
  IncomingEmployeeDepartment,
  IncomingKPIDataItem,
  IncomingKRADataList,
  IncomingKRADesignation,
  KRADataQueryBody,
} from '../../../../types/Performance/KRA/KRATypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, KRAApiConfig } from '../../apiList'

const getEmpDepartments = async (): Promise<IncomingEmployeeDepartment[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.getEmpDepartments,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getDesignation = async (
  deptId: number,
): Promise<IncomingKRADesignation[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.getDesignation,
    method: AllowedHttpMethods.get,
    params: {
      deptId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const searchKRAData = async (
  outBody: KRADataQueryBody,
): Promise<IncomingKRADataList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.searchKRAData,
    method: AllowedHttpMethods.post,
    data: outBody,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const kpisForIndividualKra = async (
  kraId: number,
): Promise<IncomingKPIDataItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.kpiForIndividualKra,
    method: AllowedHttpMethods.get,
    params: {
      kraId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteKRA = async (kraid: number): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.deleteKRA,
    method: AllowedHttpMethods.delete,
    params: {
      kraid,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteKPI = async (query: DeleteKPIParams): Promise<void> => {
  const { kraId, kpiId } = query
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.deleteKPI + kraId + '/kpi/' + kpiId,
    method: AllowedHttpMethods.delete,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const KRAApi = {
  getEmpDepartments,
  getDesignation,
  searchKRAData,
  kpisForIndividualKra,
  deleteKRA,
  deleteKPI,
}

export default KRAApi
