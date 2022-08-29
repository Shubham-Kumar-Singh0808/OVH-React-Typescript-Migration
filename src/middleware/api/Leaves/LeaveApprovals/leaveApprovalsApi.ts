import {
  GetEmployeeLeavesProps,
  GetEmployeeLeavesResponse,
  GetSearchEmployeesProps,
  GetSearchLeavesResponse,
} from '../../../../types/Leaves/LeaveApprovals/leaveApprovalsTypes'
import { EmployeeDetailsWithAttendanceReport as EmployeeDetails } from '../../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, leaveApprovalsApiConfig } from '../../apiList'

const getEmployees = async (employeeId: string): Promise<EmployeeDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveApprovalsApiConfig.getEmployees,
    method: AllowedHttpMethods.get,
    params: {
      managerEmployeeId: employeeId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getEmployeeLeaves = async (
  props: GetEmployeeLeavesProps,
): Promise<GetEmployeeLeavesResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveApprovalsApiConfig.getEmployeeLeaves,
    method: AllowedHttpMethods.get,
    params: {
      startIndex: props.startIndex ?? 0,
      endIndex: props.endIndex ?? 20,
      managerId: props.managerId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const getSearchEmployees = async (
  props: GetSearchEmployeesProps,
): Promise<GetSearchLeavesResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveApprovalsApiConfig.getSearchEmployees,
    method: AllowedHttpMethods.post,
    params: {
      startIndex: props.startIndex ?? 0,
      endIndex: props.endIndex ?? 20,
    },
    data: {
      from: props.fromDate,
      managerId: props.managerId,
      member: props.member ?? null,
      status: props.status ?? null,
      to: props.toDate,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const checkProjectManagerExists = async (leaveId: number): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveApprovalsApiConfig.checkProjectManagerExits,
    method: AllowedHttpMethods.get,
    params: {
      leaveid: leaveId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const leaveApprove = async (props: {
  leaveId: number
  comments: string
}): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveApprovalsApiConfig.leaveApprove,
    method: AllowedHttpMethods.put,
    params: {
      leaveId: props.leaveId,
      adminComments: props.comments,
    },
    data: {},
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const leaveReject = async (props: {
  leaveId: number
}): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: leaveApprovalsApiConfig.leaveReject,
    method: AllowedHttpMethods.put,
    params: {
      leaveId: props.leaveId,
    },
    data: {},
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const LeaveApprovalsApi = {
  getEmployees,
  getEmployeeLeaves,
  getSearchEmployees,
  checkProjectManagerExists,
  leaveApprove,
  leaveReject,
}

export default LeaveApprovalsApi
