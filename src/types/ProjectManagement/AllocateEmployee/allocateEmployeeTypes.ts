import { LoadingState, ValidationError } from '../../commonTypes'

export type GetAllEmployeesNames = {
  id: number
  profilePicPath?: string
  firstName?: string
  lastName?: string
  emailId?: string
  designation?: string
  fullName: string
}
export type GetAllProjects = {
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

export type AllocateEmployeeToProject = {
  allocation: string | number | undefined
  billable: string
  comments: string
  employeeIds: string[]
  endDate: string | undefined
  projectId: number
  projectName: string
  startDate: string | undefined
}

export type EmployeeAllocateSliceState = {
  getAllEmployees: GetAllEmployeesNames[]
  getAllProjects: GetAllProjects[]
  allocateEmployee: AllocateEmployeeToProject
  isLoading: LoadingState
  error: ValidationError
}
