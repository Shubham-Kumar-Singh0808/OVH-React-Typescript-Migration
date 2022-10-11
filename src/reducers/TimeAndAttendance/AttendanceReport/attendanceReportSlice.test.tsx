import moment from 'moment'
import attendanceReportReducer, {
  attendanceReportService,
} from './attendanceReportSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockAttendanceReport,
  mockDays,
} from '../../../test/data/attendanceReportData'
import { EmployeeAttendanceReportSliceState } from '../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'

const mockAttendanceReportResponseData = {
  list: mockAttendanceReport,
  days: mockDays,
  size: mockAttendanceReport.length,
}
describe('Attendance Report Slice', () => {
  describe('attendanceReportReducer', () => {
    const initialAttendanceReportState = {
      size: 0,
      days: [],
      employeeAttendanceReport: [],
      isLoading: ApiLoadingState.idle,
      monthDisplay: moment(new Date()).format('MMMM-YYYY'),
    } as EmployeeAttendanceReportSliceState

    it('Should be able to set isLoading to "loading" if getEmployeeAttendanceReport is pending', () => {
      const action = {
        type: attendanceReportService.getEmployeeAttendanceReport.pending.type,
      }
      const state = attendanceReportReducer(
        initialAttendanceReportState,
        action,
      )
      expect(state).toEqual({
        size: 0,
        days: [],
        employeeAttendanceReport: [],
        isLoading: ApiLoadingState.loading,
        monthDisplay: moment(new Date()).format('MMMM-YYYY'),
      })
    })

    it('Should be able to set isLoading to "success" if getAllLookUps is fulfilled', () => {
      const action = {
        type: attendanceReportService.getEmployeeAttendanceReport.fulfilled
          .type,
        payload: mockAttendanceReportResponseData,
      }
      const state = attendanceReportReducer(
        initialAttendanceReportState,
        action,
      )
      expect(state).toEqual({
        size: mockAttendanceReportResponseData.size,
        days: mockAttendanceReportResponseData.days,
        employeeAttendanceReport: mockAttendanceReportResponseData.list,
        isLoading: ApiLoadingState.succeeded,
        monthDisplay: moment(new Date()).format('MMMM-YYYY'),
      })
    })
  })
})
