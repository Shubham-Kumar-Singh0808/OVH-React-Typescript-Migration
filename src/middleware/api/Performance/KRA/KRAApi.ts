import {
  AddKPIData,
  DeleteKPIParams,
  Frequency,
  IncomingEmployeeDepartment,
  IncomingKPIDataItem,
  IncomingKRADataList,
  IncomingKRADesignation,
  KRADataQueryBody,
  KRADesignationPercentageQuery,
  KRATableDataItem,
  NewKPiDuplicateCheckQuery,
  NewKRABody,
  NewKRADuplicateCheckQuery,
  UpdateKRABody,
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

const addKPI = async (body: AddKPIData): Promise<AddKPIData> => {
  const { kraId, ...rest } = body
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.addKPI + kraId + '/kpi',
    method: AllowedHttpMethods.post,
    data: rest,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateKPI = async (body: IncomingKPIDataItem): Promise<AddKPIData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.updateKPI,
    method: AllowedHttpMethods.put,
    data: body,
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

const getKRADesignationPercentage = async (
  query: KRADesignationPercentageQuery,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.designationKRAPercentage,
    method: AllowedHttpMethods.get,
    params: {
      ...query,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const checkIfNewKraDuplicate = async (
  query: NewKRADuplicateCheckQuery,
): Promise<boolean> => {
  const { departmentId, designationId } = query
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.checkIfNewKRADuplicate + query.kraName + '/isDuplicate',
    method: AllowedHttpMethods.get,
    params: {
      departmentId,
      designationId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const checkIfNewKpiDuplicate = async (
  query: NewKPiDuplicateCheckQuery,
): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.checkIfNewKpiDuplicate + `${query.id + '/' + query.name}`,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addNewKRA = async (body: NewKRABody): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.addNewKRA,
    method: AllowedHttpMethods.post,
    data: body,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const editThisKra = async (kraId: number): Promise<KRATableDataItem> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.editThisKra + kraId,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateKRA = async (body: UpdateKRABody): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.updateKRA,
    method: AllowedHttpMethods.put,
    data: body,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getFrequency = async (): Promise<Frequency[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: KRAApiConfig.getFrequency,
    method: AllowedHttpMethods.get,
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
  getKRADesignationPercentage,
  checkIfNewKraDuplicate,
  addNewKRA,
  editThisKra,
  updateKRA,
  getFrequency,
  addKPI,
  updateKPI,
  checkIfNewKpiDuplicate,
}

export default KRAApi
