import {
  EmployeeAttendanceReportApiProps,
  EmployeeAttendanceReportResponse,
} from '../../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  employeeAttendanceReportApiConfig,
} from '../../apiList'

const getEmployeeAttendanceReport = async (
  props: EmployeeAttendanceReportApiProps,
): Promise<EmployeeAttendanceReportResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAttendanceReportApiConfig.getEmployeeAttendance,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: props.employeeId,
      month: props.month ?? 0,
      year: props.year ?? 0,
      startIndex: props.startIndex ?? 0,
      endIndex: props.endIndex ?? 20,
      status: props.status ?? 'Active',
      shiftid: props.shiftId ?? '',
      search: props.search ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportAttendanceReport = async (
  props: EmployeeAttendanceReportApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAttendanceReportApiConfig.exportAttendance,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: props.employeeId,
      month: props.month ?? 0,
      year: props.year ?? 0,
      status: props.status ?? 'Active',
      shiftid: props.shiftId ?? '',
      search: props.search ?? '',
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('tenantKey') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportBiometricAttendanceReport = async (
  props: EmployeeAttendanceReportApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAttendanceReportApiConfig.exportBiometricAttendance,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: props.employeeId,
      month: props.month ?? 0,
      year: props.year ?? 0,
      status: props.status ?? 'Active',
      shiftid: props.shiftId ?? '',
      search: props.search ?? '',
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('tenantKey') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const attendanceReportApi = {
  getEmployeeAttendanceReport,
  exportAttendanceReport,
  exportBiometricAttendanceReport,
}
export default attendanceReportApi
