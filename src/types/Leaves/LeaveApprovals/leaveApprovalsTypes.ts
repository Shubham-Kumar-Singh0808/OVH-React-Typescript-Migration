import { ApiLoadingState } from '../../../middleware/api/apiList'
import { EmployeeDetailsWithAttendanceReport as EmployeeDetails } from '../../TimeAndAttendance/AttendanceReport/attendanceReportTypes'

export type LeaveApprovalsSliceState = {
  getEmployees: EmployeeDetails[]
  isLoading: ApiLoadingState
  employeeLeaves: GetEmployeeLeavesResponse
  searchEmployeeLeaves: GetSearchLeavesResponse
  filterOptions: {
    isViewBtnClick: boolean
    selectStatus: string
    selectMember: number | null
    filterByFromDate: string
    filterByToDate: string
  }
}

export type EmployeeSummary = {
  empId: number
  remainingDays: number
  totalDays: number
  pendingLeaves: number
  empName: string
  approvedLeaves: number
  cancelAfterApprovalLeaves: number
}

export type Age = {
  unit: string
  magnitude: number
}

export type PartsOfTime = {
  unit: string
  value: number
  index: number
}

export type Period = {
  minimum: {
    calendar: {
      javaDate: number
      lenient: boolean
      timeInMillis: number
    }
    timeUnit: string
    monthOfYear: {
      unit: string
      value: number
      index: number
    }
    yearOfEra: {
      unit: string
      value: number
      index: number
    }
    dayofWeek: string
    partsOfTime: PartsOfTime[]
    dayOfMonth: {
      unit: string
      value: number
      index: number
    }
    javaDate: number
  }
  maximum: {
    calendar: {
      javaDate: number
      lenient: boolean
      timeInMillis: number
    }
    timeUnit: string
    monthOfYear: {
      unit: string
      value: number
      index: number
    }
    yearOfEra: {
      unit: string
      value: number
      index: number
    }
    dayofWeek: string
    partsOfTime: PartsOfTime[]
    dayOfMonth: {
      unit: string
      value: number
      index: number
    }
    javaDate: number
  }
  age: Age[]
  timeUnit: string
  duration: {
    unit: string
    magnitude: number
  }
}

export type Manager = {
  id: number
  firstName: string
  lastName: string
  middleName: null | string
  designation: null | string
  role: null | string
  manager: null | string
  designationKrasDTO: null | string
  employeeSubmitted: null | string
  managerSubmitted: null | string
  acknowledged: null | string
  fullName: null | string
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
  userName: null | string
  alternativeMobile: null | string
  dateOfJoining: null | string
  informationList: null | string
  anniversary: null | string
  bankInformationList: null | string
  bioAttendanceDtoSet: null | string
  dates: null | string
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

export type TimeSlotDTO = {
  id: number
  name: string
  startTimeHour: number
  startTimeMinutes: number
  endTimeHour: number
  endTimeMinutes: number
  graceTime: number
}
export type DesignationKraDTO = {
  id: number
  designationCode: string
  designationName: string
  comments: null | string
  krasWithWeitage: null | string
}

export type EmployeeDTO = {
  id: number
  firstName: null | string
  lastName: null | string
  middleName: null | string
  designation: null | string
  role: null | string
  manager: Manager
  designationKrasDTO: DesignationKraDTO
  employeeSubmitted: null | string
  managerSubmitted: null | string
  acknowledged: null | string
  fullName: string
  profilePicPath: string
  thumbPicture: string
  profilePicGeneratedPath: string
  gender: string
  dob: null | string
  departmentName: string
  employmentTypeName: string
  jobTypeName: string
  imageData: null | string
  curentLocation: string
  baseLocation: string
  officialBirthday: string
  maritalStatus: string
  emergencyContactName: string
  emergencyPhone: string
  emergencyRelationShip: string
  grade: null | string
  aboutMe: string
  homeNumber: null | string
  workNumber: null | string
  presentAddress: string
  presentCity: string
  presentZip: string
  presentLandMark: null | string
  permanentAddress: string
  permanentCity: string
  permanentZip: string
  permanentLandMark: null | string
  mobile: string
  homeCode: null | string
  workCode: null | string
  skillList: null | string
  userName: string
  alternativeMobile: string
  informationList: null | string
  anniversary: null | string
  bankInformationList: null | string
  bioAttendanceDtoSet: null | string
  dates: null | string
  absentCount: number
  statusName: string
  emergencyContact: string
  relievingDate: null | string
  observationDTOList: null | string
  skypeId: string
  percent: null | string
  passportNumber: null | string
  passportExpDate: null | string
  passportIssuedPlace: null | string
  passportIssuedDate: null | string
  token: null | string
  underNoticeDate: null | string
  candidateId: null | string
  underNotice: null | string
  emailId: string
  empManager: string
  bloodgroup: string
  rbtCvPath: string
  rbtCvName: string
  timeSlotDTO: TimeSlotDTO
  technology: string
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
  contractExists: boolean
  contractStartDate: null | string
  contractEndDate: null | string
  personalEmail: string
  experience: number
  companyExperience: number
  updatedExperience: number
  country: string
  workStatus: string
  comments: null | string
  vendorId: null | string
  vendorName: null | string
  address: string
}

export type LeaveAppliedOn = {
  calendar: {
    javaDate: number
    lenient: boolean
    timeInMillis: number
  }
  timeUnit: string
  monthOfYear: {
    unit: string
    value: number
    index: number
  }
  yearOfEra: {
    unit: string
    value: number
    index: number
  }
  dayofWeek: string
  partsOfTime: PartsOfTime[]
  dayOfMonth: {
    unit: string
    value: number
    index: number
  }
  javaDate: number
}

export type AllEmployeesLeavesList = {
  id: number
  leaveCategoryDTO: {
    id: number
    name: string
    leaveType: string
  }
  period: Period
  employeeComments: string
  managerComments: null | string
  employeeDTO: EmployeeDTO
  status: string
  from: string
  to: string
  leaveDate: null | string
  leaveAppliedOn: LeaveAppliedOn
  numberOfDays: number
  appliedDate: string
  canBeCancelledAfterApproval: boolean
  approvedBy: string
}

export type GetEmployeeLeavesResponse = {
  employeeSummary: EmployeeSummary[]
  allEmpLeavesList: AllEmployeesLeavesList[]
  size: number
}

export type GetSearchLeavesResponse = {
  leaveSummary: EmployeeSummary[]
  searchLeaves: AllEmployeesLeavesList[]
  size: number
}

export type GetEmployeeLeavesProps = {
  startIndex: number
  endIndex: number
  managerId: number
}

export type GetSearchEmployeesProps = {
  startIndex: number
  endIndex: number
  fromDate: string
  managerId: number
  member: number
  status: string
  toDate: string
}
