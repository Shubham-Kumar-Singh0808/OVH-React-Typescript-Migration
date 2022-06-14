import { employeeReporteesApiConfig, AllowedHttpMethods } from '../../apiList'
import { EmployeeReportees } from '../../../../types/MyProfile/ReporteesTab/employeeReporteesType'
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
const employeeReporteesApi = {
  getEmployeeReportees,
}
export default employeeReporteesApi
