import axios from 'axios'
import { AllowedHttpMethods, leaveReportsApiConfig } from '../../apiList'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import {
  LeaveReportsProps,
  LeaveSummaries,
  SearchLeaveReportsProps,
  SelectFinancialYear,
} from '../../../../types/Leaves/LeaveReports/leaveReportTypes'

const getAllEmployeesLeaveSummaries = async (
  props: LeaveReportsProps,
): Promise<LeaveSummaries> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveReportsApiConfig.getLeaveSummaries,
    method: AllowedHttpMethods.get,
    params: {
      financialYear: props.financialYear ?? '',
      startIndex: props.startIndex ?? '',
      endIndex: props.endIndex ?? '',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const searchLeaveSummaries = async (
  props: SearchLeaveReportsProps,
): Promise<LeaveSummaries> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveReportsApiConfig.searchLeaveSummaries,
    method: AllowedHttpMethods.get,
    params: {
      financialYear: props.financialYear ?? '',
      search: props.search ?? '',
      startIndex: props.startIndex ?? '',
      endIndex: props.endIndex ?? '',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const exportLeaveReportData = async (
  props: SearchLeaveReportsProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveReportsApiConfig.downloadLeaveReportList,
    method: AllowedHttpMethods.get,
    params: {
      financialYear: props.financialYear ?? '',
      search: props.search ?? '',
      startIndex: props.startIndex ?? '',
      endIndex: props.endIndex ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })
  const response = await axios(requestConfig)
  return response.data
}

const creditedYearDetails = async (): Promise<
  SelectFinancialYear[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveReportsApiConfig.creditedYears,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getFinancialYear = async (): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveReportsApiConfig.financialYear,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const leaveReportsApi = {
  getAllEmployeesLeaveSummaries,
  searchLeaveSummaries,
  creditedYearDetails,
  getFinancialYear,
  exportLeaveReportData,
}

export default leaveReportsApi
