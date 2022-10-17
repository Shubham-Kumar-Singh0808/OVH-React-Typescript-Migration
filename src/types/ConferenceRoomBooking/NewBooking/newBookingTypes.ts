import { ApiLoadingState } from '../../../middleware/api/apiList'

export type NewBookingLoggedEmployeeName = {
  id: 1985
  profilePicPath: '../profilepics/Default_Male.jpg'
  firstName: 'Vinesh'
  lastName: 'Merugu'
  emailId: 'test@raybiztech.com'
  designation: 'Associate Software Engineer'
  fullName: 'Vinesh Merugu'
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
  roomId: string
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
