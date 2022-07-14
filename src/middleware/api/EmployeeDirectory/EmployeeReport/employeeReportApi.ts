import { AllowedHttpMethods, employeeReportApiConfig } from '../../apiList'
import {
  EmployeeReportApiProps,
  EmploymentStatus,
  Country,
  GetEmployeeResponse,
} from '../../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'

const getEmployeeReport = async (
  props: EmployeeReportApiProps,
): Promise<GetEmployeeResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReportApiConfig.getEmployeeReports,
    method: AllowedHttpMethods.get,
    params: {
      country: props.country ?? '',
      endIndex: props.endIndex ?? 20,
      searchStr: props.searchEmployee ?? '',
      selectionStatus: props.selectionStatus ?? EmploymentStatus.active,
      selectionType: props.selectedCategory ?? '',
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getCountries = async (): Promise<Country[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReportApiConfig.getCountries,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const employeeReportApi = {
  getEmployeeReport,
  getCountries,
}

export default employeeReportApi
