import { rest } from 'msw'
import { employeeAttendanceReportApiConfig } from '../../middleware/api/apiList'
import { mockAttendanceReport } from '../data/attendanceReportData'

export const attendanceReportHandlers = [
  // attendance report api mock
  rest.get(
    employeeAttendanceReportApiConfig.getEmployeeAttendance,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: { list: mockAttendanceReport },
        }),
      )
    },
  ),
]
