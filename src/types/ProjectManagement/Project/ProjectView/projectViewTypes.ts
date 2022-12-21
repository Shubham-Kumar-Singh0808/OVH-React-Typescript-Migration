import { LoadingState } from '../../../commonTypes'

export type ProjectViewDetails = {
  employeeId: number
  empFirstName: string
  empLastName: string
  projectName: string
  projectId: 317
  startDate: string
  endDate: string
  comments: string
  department: string
  desigination: string
  userName: boolean
  isAllocated: true
  duration: null
  count: null
  rate: null
  role: null
  amount: null
  empName: null
  status: null
  monthWorkingDays: null
  holidays: null
  leaves: null
  totalDays: null
  hours: null
  totalValue: null
  allocation: string
}

export type ProjectDetail = {
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
  employeeId: null
  health: null
  client: string
  type: string
  clientId: null
  projectStartdate: null
  projectEndDate: null
  requiredResources: null
  newClient: null
  requestedBy: null
  statuEditFlag: string
  technology: null
  address: null
  personName: null
  email: null
  country: null
  organization: null
  intrnalOrNot: false
  hiveProjectName: string
  cc: null
  bcc: null
  deliveryManager: null
  projectRequestId: number
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
  hiveProjectFlag: boolean
  allocation: null
}

export type ProjectViewDetailsState = {
  projectViewDetails: ProjectViewDetails[]
  projectDetail: ProjectDetail
  isLoading: LoadingState
}
