import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type MileStonesList = {
  size: number
  list: MileStoneResponse[]
}

export type AllocatedMilestonePeople = {
  employeeId: number
  empFirstName: string
  empLastName: string
  projectName: string
  projectId: number
  startDate: string
  endDate: string
  billable: boolean
  comments: null
  department: string
  desigination: string
  userName: string
  isAllocated: boolean
  duration: null
  count: null
  rate: null
  role: string
  amount: null
  empName: null
  status: null
  monthWorkingDays: string
  holidays: string
  leaves: string
  totalDays: string
  hours: string
  totalValue: string
  allocation: string
}

export type MileStoneResponse = {
  id: number
  title: string
  milestoneNumber: string
  planedDate: string
  actualDate: string
  billable: boolean
  comments: string
  project: string
  client: string
  projectId: null
  isClosed: true
  milestonePercentage: string
  milestonePeopleDTO: null
  allocatedMilestonePeople: AllocatedMilestonePeople[]
  crId: null
  crName: null
  crDuration: null
  invoiceStatus: true
  projectType: string
  effort: null
  invoiceReopenFlag: false
  enableReopenFlag: true
  invoiceExits: null
  milestoneTypeFlag: null
  milestoneAmount: null
  raisedInvoicePercentage: null
  remainingPercentage: null
}

export type MileStoneSliceState = {
  mileStonesList: MileStonesList
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
  mileStoneHistory: MileStoneHistory[]
  getMilestone: GetMilestone
  milestoneNewsFeed: MilestoneNewsFeed[]
}
export type PeopleDTOs = {
  milestonePeopleId: null
  milestoneId: null
  employeeIds: null
  isBillable: true
  fromDate: string
  endDate: string
  employeeId: number
  employeeName: string
  employeeDesignation: string
  employeeStatus: null
  duration: null
  count: null
  rate: null
  role: null
  amount: null
  status: null
  comments: null
  noOfdays: null
  monthWorkingDays: string
  holidays: string
  leaves: string
  totalDays: string
  hours: string
  totalValue: string
  billableDays: null
}

export type MileStoneHistory = {
  id: number
  title: string
  planedDate: string
  actualDate: string
  billable: true
  comments: string
  modifiedDate: string
  modifiedBy: string
  milestoneId: number
  persistType: string
  projectName: string
  projectManager: string
  projectType: string
  projectStatus: string
  milestonePercentage: string
  peopleDTOs: PeopleDTOs[]
  milestoneAmount: null
  milestoneTypeFlag: null
}

export type GetMilestone = {
  id: number
  title: string
  milestoneNumber: string
  planedDate: string
  actualDate: string
  billable: true
  comments: string
  project: null
  client: null
  projectId: null
  isClosed: boolean
  milestonePercentage: string
  milestonePeopleDTO: null
  allocatedMilestonePeople: []
  crId: number
  crName: string
  crDuration: null
  invoiceStatus: boolean
  projectType: null
  effort: null
  invoiceReopenFlag: null
  enableReopenFlag: null
  invoiceExits: null
  milestoneTypeFlag: boolean
  milestoneAmount: null
  raisedInvoicePercentage: null
  remainingPercentage: null
}

export type MilestoneNewsFeed = {
  feedPostCommentsList: []
  id: number
  invoiceId: number
  post: string
  postDate: string
  postImageData: string
  milestone: Milestone
  project: Project
  postedBy: PostedBy
}

export type PostedBy = {
  aboutMe: string
  absentCount: number
  acknowledged: null
  address: string
  alternativeMobile: null
  anniversary: null
  bankInformationList: null
  baseLocation: string
  bioAttendanceDtoSet: null
  bloodgroup: string
  candidateId: null
  casualLeaveCount: number
  comments: null
  companyExperience: number
  contractEndDate: null
  contractExists: false
  contractStartDate: null
  country: string
  countryCodeAlternative: null
  countryCodeEmergency: null
  countryCodeHome: null
  countryCodeMobile: null
  countryCodeWork: null
  curentLocation: string
  dateOfJoining: string
  dates: null
  departmentName: string
  designation: string
  designationKrasDTO: DesignationKrasDTO
  dob: null
  emailId: string
  emergencyContact: string
  emergencyContactName: string
  emergencyPhone: string
  emergencyRelationShip: string
  empManager: string
  employeeSubmitted: null
  employmentTypeName: string
  experience: number
  firstName: string
  fullName: string
  gender: string
  grade: null
  holidaysCount: number
  homeCode: null
  homeNumber: null
  hrAssociate: null
  id: number
  imageData: null
  informationList: null
  jobTypeName: string
  lastName: string
  lateComingCount: null
  lopLeaveCount: number
  manager: Manager
  project: Project
}
export type Project = {
  address: null
  allocation: null
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
  employeeId: null
  enddate: string
  health: null
  hiveProjectFlag: boolean
  hiveProjectName: string
  id: number
  intrnalOrNot: boolean
  isAllocated: null
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
  projectEndDate: null
  projectName: string
  projectRequestId: null
  projectRequestMilestoneDTO: null
  projectStartdate: null
  requestedBy: null
  requiredResources: null
  startdate: string
  statuEditFlag: null
  status: string
  technology: null
  type: string
}
export type DesignationKrasDTO = {
  id: number
  designationCode: string
  designationName: string
  comments: null
  krasWithWeitage: null
}
export type Manager = {
  id: number
  firstName: string
  lastName: string
  middleName: null
  designation: null
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
  country: null
  workStatus: null
  comments: null
  vendorId: null
  vendorName: null
  countryCodeWork: null
  countryCodeMobile: null
  countryCodeHome: null
  countryCodeEmergency: null
  countryCodeAlternative: null
  address: null
}

export type Milestone = {
  id: number
  title: string
  milestoneNumber: string
  planedDate: string
  actualDate: string
  billable: true
  comments: null
  project: null
  client: null
  projectId: null
  isClosed: true
  milestonePercentage: string
  milestonePeopleDTO: null
  allocatedMilestonePeople: null
  crId: null
  crName: null
  crDuration: null
  invoiceStatus: true
  projectType: null
  effort: null
  invoiceReopenFlag: false
  enableReopenFlag: null
  invoiceExits: null
  milestoneTypeFlag: null
  milestoneAmount: null
  raisedInvoicePercentage: null
  remainingPercentage: null
}

export type MileStoneDiscussionProps = {
  milestoneId: number
  projectid: number | string
}

export type PostMileStoneProps = {
  milestone: PostMileStone
  post: string
  postedBy: postedBy
  project: PostProjectMileStone
}

export type PostMileStone = {
  id: string | number
}

export type postedBy = {
  id: string | number
}
export type PostProjectMileStone = {
  id: string
}
