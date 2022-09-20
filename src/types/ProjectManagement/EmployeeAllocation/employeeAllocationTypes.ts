import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeAllocationReportType = {
  Empsize: number
  emps: GetEmployeeAllocationReport[]
}
export type EmployeeAllocationReportState = {
  Empsize: number
  emps: GetEmployeeAllocationReport[]
  projectUnderEmployees: ProjectUnderEmployees[]
  isLoading: LoadingState
  error: ValidationError
}
export type GetEmployeeAllocationReport = {
  id: number
  firstName: string
  lastName: string
  middleName: null
  designation: string
  role: null
  manager: null
  designationKrasDTO: null
  employeeSubmitted: null
  managerSubmitted: null
  acknowledged: null
  fullName: null
  profilePicPath: null
  thumbPicture: null
  profilePicGeneratedPath: null
  gender: null
  dob: null
  departmentName: string
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
  userName: null
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
  percent: number
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
  country: null
  workStatus: null
  comments: null
  vendorId: null
  vendorName: null
  address: null
}

export type EmployeeAllocationReportProps = {
  Billingtype: string
  EmployeeStatus: string
  dateSelection: string
  departmentNames: string
  employeeName: string
  endIndex: number
  enddate: string
  firstIndex: number
  startdate: string
  technology: string
}

export type ProjectUnderEmployees = {
  id: number
  projectName: string
  managerId: number
  startdate: string
  enddate: string
  description: string
  status: string
  managerName: string
  count: null
  billable: boolean
  isAllocated: boolean
  employeeId: number
  health: string
  client: string
  type: string
  clientId: null
  projectStartdate: string
  projectEndDate: string
  requiredResources: null
  newClient: null
  requestedBy: null
  statuEditFlag: null
  technology: null
  address: null
  personName: null
  email: null
  country: null
  organization: null
  intrnalOrNot: boolean
  hiveProjectName: string
  cc: null
  bcc: null
  deliveryManager: null
  projectRequestId: null
  model: string
  checkListExist: null
  projectCode: null
  projectContactPerson: string
  projectContactEmail: string
  billingContactPerson: string
  billingContactPersonEmail: string
  projectRequestMilestoneDTO: null
  platform: string
  domain: string
  clientName: string
  hiveProjectFlag: false
  allocation: string
}

export type ProjectUnderEmployeesProps = {
  dateSelection: string
  employeeid: number
  enddate: string
  isAllocated: string
  isBillale: string
  startdate: string
}

export type EmployeeAllocationReportTableProps = {
  Select: string
  toDate: string
  allocationStatus: string
  billingStatus: string
  fromDate: string
}

export type UpdateEmployeeAllocationProject = {
  address: null
  allocation: string
  bcc: null
  billable: boolean
  billingContactPerson: string
  billingContactPersonEmail: string
  cc: null
  checkListExist: null
  client: string
  clientId: null
  clientName: string
  count: null
  country: null
  deliveryManager: null
  description: string
  domain: string
  email: null
  employeeId: number
  enddate: string
  health: string
  hiveProjectFlag: false
  hiveProjectName: string
  id: number
  intrnalOrNot: boolean
  isAllocated?: boolean
  managerId: number
  managerName: string
  model: string
  newClient: null
  organization: null
  personName: null
  platform: string
  projectCode: null
  projectContactEmail: string
  projectContactPerson: string
  projectEndDate: string
  projectName: string
  projectRequestId: null
  projectRequestMilestoneDTO: null
  projectStartdate: string
  requestedBy: null
  requiredResources: null
  startdate: string
  statuEditFlag: null
  status: string
  technology: null
  type: string
}

export type EmployeeExportAllocationReport = {
  id: number | string
  startIndex: number
  endIndex: number
  empName: string
  technology: string
  isbillable: string
  isAllocated: string
  startdate: string
  lastdate: string
  departmentNames: string
  dateSelection: string
}
