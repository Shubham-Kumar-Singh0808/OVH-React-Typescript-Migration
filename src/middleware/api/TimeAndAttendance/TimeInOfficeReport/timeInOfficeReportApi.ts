import {
  exportAttendanceReportProps,
  GetTimeInOfficeEmployeeReportProps,
  GetTimeInOfficeEmployeeReportResponse,
  GetTimeInOfficeManagerReportResponse,
  GetTimeInOfficeProps,
  SearchResultResponse,
} from '../../../../types/TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, timeInOfficeReportApiConfig } from '../../apiList'

const getTimeInOfficeEmployeeReport = async (
  props: GetTimeInOfficeEmployeeReportProps,
): Promise<GetTimeInOfficeEmployeeReportResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: timeInOfficeReportApiConfig.getTimeInOfficeEmployeeReport,
    method: AllowedHttpMethods.get,
    params: {
      date: props.date,
      loggedInEmployeeId: props.loggedInEmployeeId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getTimeInOfficeManagerReport = async (
  props: GetTimeInOfficeEmployeeReportProps,
): Promise<GetTimeInOfficeManagerReportResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: timeInOfficeReportApiConfig.getTimeInOfficeManagerReport,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      date: props.date,
      loggedInEmployeeId: props.loggedInEmployeeId,
      search: props.search ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportAttendanceReport = async (
  props: exportAttendanceReportProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: timeInOfficeReportApiConfig.exportAttendanceReport,
    method: AllowedHttpMethods.get,
    params: {
      hiveDate: props.hiveDate ?? '',
      search: props.search ?? '',
      token: localStorage.getItem('token') ?? '',
      tenantKey: 'RAYBIZTECH',
    },
    responseType: 'blob',
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const searchTimeInOffice = async (
  props: GetTimeInOfficeProps,
): Promise<SearchResultResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: timeInOfficeReportApiConfig.searchTimeInOffice,
    method: AllowedHttpMethods.get,
    params: {
      date: props.date,
      endIndex: props.endIndex,
      loggedInEmployeeId: props.loggedInEmployeeId,
      search: props.search,
      startIndex: props.startIndex,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const timeInOfficeReportApi = {
  getTimeInOfficeEmployeeReport,
  getTimeInOfficeManagerReport,
  exportAttendanceReport,
  searchTimeInOffice,
}

export default timeInOfficeReportApi
