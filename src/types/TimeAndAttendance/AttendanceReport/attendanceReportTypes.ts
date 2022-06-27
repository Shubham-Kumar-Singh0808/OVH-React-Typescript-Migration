import { ApiLoadingState } from '../../../middleware/api/apiList'

export type EmployeeBioAttendanceDtoSet = {
  id: number
  start: string
  inTime: string
  outTime: string
  attendanceStatus: null | string
  color: string
  rendering: null | string
  overlap: boolean
  title: null | string
  textColor: null | string
  className: null | string
  timeInOffice: null | string
  hiveHours: null | string
  lateReport: null | string
}

export type EmployeeDetailsWithAttendanceReport = {
  id: number
  firstName: null | string
  lastName: null | string
  middleName: null | string
  designation: null | string
  role: null | string
  manager: null | string
  designationKrasDTO: null | string
  employeeSubmitted: null | string
  managerSubmitted: null | string
  acknowledged: null | string
  fullName: string
  profilePicPath: null | string
  thumbPicture: null | string
  profilePicGeneratedPath: null | string
  gender: null | string
  dob: null | string
  departmentName: null | string
  employmentTypeName: null | string
  jobTypeName: null | string
  imageData: null | string
  curentLocation: null | string
  baseLocation: null | string
  officialBirthday: null | string
  realBirthday: null | string
  maritalStatus: null | string
  emergencyContactName: null | string
  emergencyPhone: null | string
  emergencyRelationShip: null | string
  grade: null | string
  aboutMe: null | string
  homeNumber: null | string
  workNumber: null | string
  presentAddress: null | string
  presentCity: null | string
  presentZip: null | string
  presentLandMark: null | string
  permanentAddress: null | string
  permanentCity: null | string
  permanentZip: null | string
  permanentLandMark: null | string
  mobile: null | string
  homeCode: null | string
  workCode: null | string
  skillList: null | string
  userName: string
  alternativeMobile: null | string
  dateOfJoining: null | string
  informationList: null | string
  anniversary: null | string
  bankInformationList: null | string
  bioAttendanceDtoSet: EmployeeBioAttendanceDtoSet[]
}
export type EmployeeAttendanceReportResponse = {
  size: number
  days: number[]
  list: EmployeeDetailsWithAttendanceReport[]
}

export type EmployeeAttendanceReportSliceState = {
  size: number
  days: number[]
  employeeAttendanceReport: EmployeeDetailsWithAttendanceReport[]
  isLoading: ApiLoadingState
}

export type EmployeeAttendanceReportApiProps = {
  employeeId: number
  month?: number
  year?: number
  startIndex?: number
  endIndex?: number
  status?: string
  shiftId?: number
  search?: string
}

export type BiometricAndShiftFilterOptionsProps = {
  biometric: string
  setBiometric: (value: string) => void
  employeeRole: string
  setSearchEmployee: (value: string) => void
}

export type AttendanceReportTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}
