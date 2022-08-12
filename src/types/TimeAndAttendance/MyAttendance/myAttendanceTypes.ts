import { LoadingState } from '../../commonTypes'

export type AttendanceRecord = {
  id: string
  start: string
  color: string
  overlap: boolean
  title: string
  hiveHours?: string
}

export type GetMyAttendanceProps = {
  start: string
  end: string
  loggedInEmployeeId: string | number
}

export type EmployeeAttendance = AttendanceRecord[]

export type MyAttendanceSliceState = {
  employeeAttendance: EmployeeAttendance
  isLoading: LoadingState
}
