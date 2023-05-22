import axios from 'axios'
import {
  EmployeeLeaveHistoryResponse,
  LeaveHistoryApiProps,
  LeaveSummary,
} from '../../../../types/Leaves/LeaveSummary/employeeLeaveSummaryTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, leaveSummaryApiConfig } from '../../apiList'

const getEmployeeLeaveSummary = async (): Promise<LeaveSummary> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveSummaryApiConfig.getEmployeeLeaveSummary,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeLeaveHistory = async (
  props: LeaveHistoryApiProps,
): Promise<EmployeeLeaveHistoryResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveSummaryApiConfig.getEmployeeLeaveHistory,
    method: AllowedHttpMethods.get,
    params: {
      startIndex: props.startIndex ?? 0,
      endIndex: props.endIndex ?? 20,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const cancelEmployeeLeave = async (
  leaveId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveSummaryApiConfig.cancelEmployeeLeave,
    method: AllowedHttpMethods.put,
    params: {
      leaveId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const cancelAfterApproval = async (
  leaveId: number,
): Promise<EmployeeLeaveHistoryResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveSummaryApiConfig.cancelAfterApproval,
    method: AllowedHttpMethods.put,
    params: {
      leaveId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const LeaveSummaryApi = {
  getEmployeeLeaveSummary,
  getEmployeeLeaveHistory,
  cancelEmployeeLeave,
  cancelAfterApproval,
}

export default LeaveSummaryApi
