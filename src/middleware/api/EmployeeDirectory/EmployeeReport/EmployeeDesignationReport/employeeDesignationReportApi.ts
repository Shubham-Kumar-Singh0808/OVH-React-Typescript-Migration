import axios from 'axios'
import {
  AllowedHttpMethods,
  employeeDesignationReportApiConfig,
} from '../../../apiList'
import {
  EmployeeDesignationReportApiProps,
  GetEmployeeDesignationResponse,
  Designation,
} from '../../../../../types/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportTypes'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getDesignations = async (): Promise<Designation[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeDesignationReportApiConfig.getAllDesignations,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeDesignationReport = async (
  props: EmployeeDesignationReportApiProps,
): Promise<GetEmployeeDesignationResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeDesignationReportApiConfig.getEmployeeCategoryData,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      selectionDesignation: props.selectedDesignation ?? '',
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const exportEmployeeDesignationReport = async (
  props: EmployeeDesignationReportApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeDesignationReportApiConfig.exportEmployeeCategoryData,
    method: AllowedHttpMethods.get,
    params: {
      selectionDesignation: props.selectedDesignation ?? '',
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await axios(requestConfig)
  return response.data
}

const employeeReportDesignationAPI = {
  getDesignations,
  getEmployeeDesignationReport,
  exportEmployeeDesignationReport,
}

export default employeeReportDesignationAPI
