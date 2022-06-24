import axios from 'axios'
import {
  EmployeeAttendanceReportApiProps,
  EmployeeAttendanceReportResponse,
} from '../../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
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

  const response = await axios(requestConfig)
  return response.data
}

const attendanceReportApi = {
  getEmployeeAttendanceReport,
}
export default attendanceReportApi
