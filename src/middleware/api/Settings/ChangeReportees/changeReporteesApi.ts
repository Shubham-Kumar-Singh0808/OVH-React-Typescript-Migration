import { AllowedHttpMethods, ChangeReporteesAPiConfig } from '../../apiList'
import {
  EmployeeData,
  UpdateManager,
} from '../../../../types/Settings/ChangeReportees/changeReporteesTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'

const getAllReportingManager = async (): Promise<EmployeeData[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ChangeReporteesAPiConfig.getAllReportingManagerData,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllHRList = async (): Promise<EmployeeData[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ChangeReporteesAPiConfig.getAllHRList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllEmployeesUnderManager = async (
  managerId: number,
): Promise<EmployeeData[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ChangeReporteesAPiConfig.getEmployeesUnderManger,
    method: AllowedHttpMethods.get,
    params: {
      managerId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getHrAssociatesUnderHRManager = async (
  hrId: number,
): Promise<EmployeeData[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ChangeReporteesAPiConfig.getHrAssociates,
    method: AllowedHttpMethods.get,
    params: {
      hrId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateReportingManager = async (
  ReportingManagerdata: UpdateManager,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ChangeReporteesAPiConfig.updateReportingManager,
    method: AllowedHttpMethods.post,
    data: ReportingManagerdata,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateHrAssociatesManager = async (
  HrAssociatesManager: UpdateManager,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ChangeReporteesAPiConfig.updateHrAssociatesManager,
    method: AllowedHttpMethods.post,
    data: HrAssociatesManager,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

export const ChangeReporteesApi = {
  getAllReportingManager,
  getAllHRList,
  getAllEmployeesUnderManager,
  getHrAssociatesUnderHRManager,
  updateReportingManager,
  updateHrAssociatesManager,
}
