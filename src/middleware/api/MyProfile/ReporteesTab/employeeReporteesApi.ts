import { employeeReporteesApiConfig, AllowedHttpMethods } from '../../apiList'
import {
  EmployeeReportees,
  EmployeeReporteesKRAs,
} from '../../../../types/MyProfile/ReporteesTab/employeeReporteesType'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeReportees = async (
  empID: number | string,
): Promise<EmployeeReportees[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReporteesApiConfig.getEmployeeReportees,
    method: AllowedHttpMethods.get,
    params: {
      empID: empID,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeReporteesKRAs = async (
  personId: number | string,
): Promise<EmployeeReporteesKRAs[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReporteesApiConfig.getEmployeeReporteesKRA,
    method: AllowedHttpMethods.get,
    params: {
      personId: personId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
const employeeReporteesApi = {
  getEmployeeReportees,
  getEmployeeReporteesKRAs,
}
export default employeeReporteesApi
