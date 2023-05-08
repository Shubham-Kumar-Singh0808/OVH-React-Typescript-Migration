import { LoadingState, ValidationError } from '../../commonTypes'

export type LeaveSummaries = {
  length: number
  size: number
  name: string
  list: LeaveSummariesList[]
}

export type EmployeeDTOList = {
  id: number
  firstName: null
  lastName: null
  middleName: null
  designation: null
  role: null
  manager: null
  designationKrasDTO: null
  employeeSubmitted: null
  managerSubmitted: null
  acknowledged: null
  fullName: string
  profilePicPath: null
  thumbPicture: null
  profilePicGeneratedPath: null
  gender: null
  dob: null
  departmentName: null
  employmentTypeName: null
  jobTypeName: null
  imageData: null
  curentLocation: null
  baseLocation: null
  officialBirthday: null
  realBirthday: null
  maritalStatus: null
  emergencyContactName: null
  emergencyPhone: null
  emergencyRelationShip: null
  grade: null
  aboutMe: null
  homeNumber: null
  workNumber: null
  presentAddress: null
  presentCity: null
  presentZip: null
  presentLandMark: null
  permanentAddress: null
  permanentCity: null
  permanentZip: null
  permanentLandMark: null
  mobile: null
  homeCode: null
  workCode: null
  skillList: null
  userName: string
  alternativeMobile: null
  dateOfJoining: null
  informationList: null
  anniversary: null
  bankInformationList: null
  bioAttendanceDtoSet: null
  dates: null
  absentCount: number
  statusName: null
  emergencyContact: null
  relievingDate: null
  observationDTOList: null
  skypeId: null
  percent: null
  passportNumber: null
  passportExpDate: null
  passportIssuedPlace: null
  passportIssuedDate: null
  token: null
  underNoticeDate: null
  candidateId: null
  underNotice: null
  emailId: null
  empManager: null
  bloodgroup: null
  rbtCvPath: null
  rbtCvName: null
  timeSlotDTO: null
  technology: null
  hrAssociate: null
  lateComingCount: null
  passportFrontPagePath: null
  passportBackPagePath: null
  passportFrontPage: null
  passportBackPage: null
  projectManager: null
  casualLeaveCount: number
  lopLeaveCount: number
  holidaysCount: number
  contractExists: null
  contractStartDate: null
  contractEndDate: null
  personalEmail: null
  experience: null
  companyExperience: null
  updatedExperience: null
  country: string
  workStatus: null
  comments: null
  vendorId: null
  vendorName: null
  address: null
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
