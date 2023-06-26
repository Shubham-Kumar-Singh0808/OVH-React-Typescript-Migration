import { employeeReporteesApiConfig, AllowedHttpMethods } from '../../apiList'
import {
  EmployeeReportee,
  EmployeeReporteesKRA,
  EmployeeReporteesKPI,
} from '../../../../types/MyProfile/ReporteesTab/employeeReporteesType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'

const getEmployeeReportees = async (
  empID: number | string | undefined,
): Promise<EmployeeReportee[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReporteesApiConfig.getEmployeeReportees,
    method: AllowedHttpMethods.get,
    params: {
      empID,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getEmployeeReporteesKRAs = async (
  personId: number | string,
): Promise<EmployeeReporteesKRA[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReporteesApiConfig.getEmployeeReporteesKRAs,
    method: AllowedHttpMethods.get,
    params: {
      personId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getEmployeeReporteesKPIs = async (
  kraId: number | string,
): Promise<EmployeeReporteesKPI[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReporteesApiConfig.getEmployeeReporteesKPIs,
    method: AllowedHttpMethods.get,
    params: {
      kraId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const exportReporteeList = async (): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReporteesApiConfig.exportReporteeList,
    method: AllowedHttpMethods.get,
    params: {
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('tenantKey') ?? '',
    },
    responseType: 'blob',
  })
  const response = await useAxios(requestConfig)
  return response.data
}
const employeeReporteesApi = {
  getEmployeeReportees,
  getEmployeeReporteesKRAs,
  getEmployeeReporteesKPIs,
  exportReporteeList,
}
export default employeeReporteesApi
