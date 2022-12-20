import { ApiLoadingState } from '../../../middleware/api/apiList'

export type NewBookingLoggedEmployeeName = {
  id: number
  profilePicPath: string
  firstName: string
  lastName: string
  emailId: string
  designation: string
  fullName: string
}
export type Author = {
  designation: string
  emailId: string
  firstName: string
  fullName: string
  id: number
  lastName: string
  profilePicPath: string
}

export type Availability = {
  id: number
  availability: string
}

export type newBookingSliceState = {
  loggedEmployeeName: NewBookingLoggedEmployeeName
  isLoading: ApiLoadingState
  allEmployeesProfiles: NewBookingLoggedEmployeeName[]
  getAllProjects: GetAllProjectNames[]
  getAllAttendies: GetAllAttendies[]
}

export type AddRoom = {
  agenda: string
  authorName: Author
  availability: Availability[]
  conferenceType: string
  employeeIds: []
  endTime: string
  fromDate: string
  locationId: number
  projectName: string
  roomId: number
  startTime: string
}

export type GetAllProjectNames = {
  id: number
  projectName: string
  managerId: number
  startdate: string
  enddate: string
  description: string
  status: string
  managerName: string
  count: null
  billable: false
  isAllocated: null
  employeeId: null
  health: null
  client: null
  type: null
  clientId: null
  projectStartdate: null
  projectEndDate: null
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
  intrnalOrNot: null
  hiveProjectName: null
  cc: null
  bcc: null
  deliveryManager: null
  projectRequestId: null
  model: null
  checkListExist: null
  projectCode: null
  projectContactPerson: null
  projectContactEmail: null
  billingContactPerson: null
  billingContactPersonEmail: null
  projectRequestMilestoneDTO: null
  platform: null
  domain: null
  clientName: null
  hiveProjectFlag: null
  allocation: null
}
export type GetAllAttendies = {
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
  userName: null
  alternativeMobile: null
  dateOfJoining: null
  informationList: null
  anniversary: null
  bankInformationList: null
  bioAttendanceDtoSet: null
  dates: null
  absentCount: 0
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
  casualLeaveCount: 0
  lopLeaveCount: 0
  holidaysCount: 0
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

export type ConfirmNewMeetingAppointment = {
  agenda: string
  authorName: Author
  availability: Availability[]
  conferenceType: string
  employeeIds?: []
  endTime: string
  fromDate: string
  locationId: number
  projectName: string | GetAllProjectNames
  roomId: number | string
  startTime: string
}
