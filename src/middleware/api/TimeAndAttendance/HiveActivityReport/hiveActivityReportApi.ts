import axios from 'axios'
import {
  EmployeeHiveReport,
  GetHiveActivityReportProps,
  GetManagerHiveActivityReportResponse,
} from '../../../../types/TimeAndAttendance/HiveActivityReport/hiveActivityReportTypes'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import { hiveActivityReportApiConfig, AllowedHttpMethods } from '../../apiList'

const getEmployeeHiveActivityReport = async (
  props: GetHiveActivityReportProps,
): Promise<EmployeeHiveReport> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: hiveActivityReportApiConfig.getEmployeeHiveActivityReport,
    method: AllowedHttpMethods.get,
    params: {
      hiveDate: props.date,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const getManagerHiveActivityReport = async (
  props: GetHiveActivityReportProps,
): Promise<GetManagerHiveActivityReportResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: hiveActivityReportApiConfig.getManagerHiveActivityReport,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      hiveDate: props.date,
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const getSearchHiveActivityReport = async (
  props: GetHiveActivityReportProps,
): Promise<GetManagerHiveActivityReportResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: hiveActivityReportApiConfig.getSearchHiveTime,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      hiveDate: props.date,
      startIndex: props.startIndex ?? 0,
      loggedInEmployeeId: props.loggedInEmployeeId,
      search: props.searchText,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const exportHiveActivityReport = async (
  date: string,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: hiveActivityReportApiConfig.exportHiveReport,
    method: AllowedHttpMethods.get,
    params: {
      hiveDate: date,
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('tenantKey') ?? '',
    },
    responseType: 'blob',
  })

  const response = await axios(requestConfig)
  return response.data
}

const hiveActivityReportApi = {
  getEmployeeHiveActivityReport,
  getManagerHiveActivityReport,
  getSearchHiveActivityReport,
  exportHiveActivityReport,
}

export default hiveActivityReportApi
