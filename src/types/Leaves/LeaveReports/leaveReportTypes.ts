import { LoadingState, ValidationError } from '../../commonTypes'

export type LeaveSummaries = {
  length: number
  size: number
  name: string
  list: LeaveSummariesList[]
}

export type EmployeeDTOList = {
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
  fullName: string | null
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
  emergencyPhone: null | number
  emergencyRelationShip: null | string
  grade: null | string
  aboutMe: null | string
  homeNumber: null | number
  workNumber: null | number
  presentAddress: null | string
  presentCity: null | string
  presentZip: null | string
  presentLandMark: null | string
  permanentAddress: null | string
  permanentCity: null | string
  permanentZip: null | string
  permanentLandMark: null | string
  mobile: null
  homeCode: null | string
  workCode: null | string
  skillList: null | string
  userName: null | string
  alternativeMobile: null
  dateOfJoining: null | string
  informationList: null | string
  anniversary: null | string
  bankInformationList: null | string
  bioAttendanceDtoSet: null | string
  dates: null | string
  absentCount: number
  statusName: null | string
  emergencyContact: null
  relievingDate: null | string
  observationDTOList: null | string
  skypeId: null
  percent: null | string
  passportNumber: null | string
  passportExpDate: null | string
  passportIssuedPlace: null | string
  passportIssuedDate: null | string
  token: null | string
  underNoticeDate: null
  candidateId: null
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
  passportFrontPagePath: null
  passportBackPagePath: null
  passportFrontPage: null
  passportBackPage: null
  projectManager: null
  casualLeaveCount: number
  lopLeaveCount: number
  holidaysCount: number | null
  contractExists: null | boolean
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

export type LeaveSummariesList = {
  id: number
  employeeDTO: EmployeeDTOList
  allScheduledLeaves: number
  carryForwardedLeaves: number
  calculatedCreditedLeaves: number
  allLOPPendingLeaves: number
  allLOPTakenLeaves: number
  leaveCategorySummaries: GetLeaveSummaries[]
  allAvailableLeaves: number
  allTakenLeaves: number
  allPendingLeaves: number
  allCreditedLeaves: number
  allCancelAfterApprovalLeaves: number
}

export type GetLeaveSummaries = {
  id: number
  leaveCategoryDTO: LeaveCategoryDTO
  daysPending: number
  daysTaken: number
  daysScheduled: number
  daysCancelAfterApprovalPending: number
}

export type LeaveReportState = {
  leaveSummaries: LeaveSummaries
  selectFinancialYear: SelectFinancialYear[]
  financialYear: number
  isLoading: LoadingState
  error: ValidationError
  listSize: number
}

export type LeaveReportsProps = {
  financialYear: number | string
  startIndex: number
  endIndex: number
}

export type LeaveCategoryDTO = {
  id: number
  name: string
  leaveType: string
}

export type SearchLeaveReportsProps = {
  financialYear: number | string
  search: string
  startIndex: number
  endIndex: number
}

export type SelectFinancialYear = {
  calendar: CalenderType
  timeUnit: string
  monthOfYear: MonthOfYear
  yearOfEra: YearOfEra
  dayofWeek: string
  dayOfMonth: DayOfMonth
  partsOfTime: PartsOfTime[]
  javaDate: number
}

export type CalenderType = {
  javaDate: number
  lenient: boolean
  timeInMillis: number
}

export type MonthOfYear = {
  unit: string
  value: number
  index: number
}

export type YearOfEra = {
  unit: string
  value: number
  index: number
}

export type DayOfMonth = {
  unit: string
  value: number
  index: number
}

export type PartsOfTime = {
  unit: string
  value: number
  index: number
}

export type FinancialYear = {
  value: number
}

export type EmployeeLeaveReportTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  selectYear?: string
}

export type LeaveReportOptionsProps = {
  selectYear: string
  setSelectYear: (value: string) => void
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}
