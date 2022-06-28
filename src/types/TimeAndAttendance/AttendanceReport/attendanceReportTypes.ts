import { ApiLoadingState } from '../../../middleware/api/apiList'
import { EmployeeShiftDetails } from '../../EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'

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
  absentCount: number
  statusName: null | string
  emergencyContact: null | string
  relievingDate: null | string
  observationDTOList: null | string
  skypeId: null | string
  percent: null | string
  passportNumber: null | string
  passportExpDate: null | string
  passportIssuedPlace: null | string
  passportIssuedDate: null | string
  token: null | string
  underNoticeDate: null | string
  candidateId: null | string
  underNotice: null | string
  emailId: null | string
  empManager: null | string
  bloodgroup: null | string
  rbtCvPath: null | string
  rbtCvName: null | string
  timeSlotDTO: null | string
  technology: null | string
  hrAssociate: null | string
  lateComingCount: null | string
  passportFrontPagePath: null | string
  passportBackPagePath: null | string
  passportFrontPage: null | string
  passportBackPage: null | string
  projectManager: null | string
  casualLeaveCount: number
  lopLeaveCount: number
  holidaysCount: number
  contractExists: null | string
  contractStartDate: null | string
  contractEndDate: null | string
  personalEmail: null | string
  experience: null | string
  companyExperience: null | string
  updatedExperience: null | string
  country: null | string
  workStatus: null | string
  comments: null | string
  vendorId: null | string
  vendorName: null | string
  address: null | string
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
  shiftId?: string
  search?: string
}

export type BiometricAndShiftFilterOptionsProps = {
  biometric: string
  setBiometric: (value: string) => void
  employeeRole: string
  setSearchEmployee: (value: string) => void
  userAccess: boolean
  employeeShifts: EmployeeShiftDetails[]
  selectShiftId: string
  setSelectShiftId: (value: string) => void
}

export type AttendanceReportTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export enum EmployeeStatus {
  'active' = 'Active',
  'inactive' = 'InActive',
}
