import axios from 'axios'
import { EmployeeAttendanceReportResponse } from '../../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  employeeAttendanceReportApiConfig,
} from '../../apiList'

const getEmployeeAttendanceReport =
  async (): Promise<EmployeeAttendanceReportResponse> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: employeeAttendanceReportApiConfig.getEmployeeAttendance,
      method: AllowedHttpMethods.get,
    })

    const response = await axios(requestConfig)
    return response.data
  }
