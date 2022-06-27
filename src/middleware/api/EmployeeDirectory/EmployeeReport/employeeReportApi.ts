import axios from 'axios'

import { AllowedHttpMethods, employeeReportApiConfig } from '../../apiList'
import {
  EmployeeReportApiProps,
  EmploymentStatus,
  GetEmployeeResponse,
} from '../../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeReport = async (
  props: EmployeeReportApiProps,
): Promise<GetEmployeeResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReportApiConfig.getEmployeeReports,
    method: AllowedHttpMethods.get,
    params: {
      country: '',
      endIndex: props.endIndex ?? 20,
      searchStr: props.searchEmployee ?? '',
      selectionStatus: props.selectionStatus ?? EmploymentStatus.active,
      selectionType: props.selectedCategory ?? '',
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const employeeReportApi = {
  getEmployeeReport,
}

export default employeeReportApi
