import { LoadingState } from '../../../commonTypes'

export type ProjectViewDetails = {
  employeeId: number
  empFirstName: string
  empLastName: string
  projectName: string
  projectId: number
  startDate: string
  endDate: string
  comments: string
  department: string
  desigination: string
  userName: string
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
  billable: boolean
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

export type UpdateProjectViewDetails = {
  allocation: string
  amount: null
  billable: boolean
  comments: string
  count: null
  department: string
  desigination: string
  duration: null
  empFirstName: string
  empLastName: string
  empName: null
  employeeId: number
  endDate: string
  holidays: null
  hours: null
  isAllocated: true
  leaves: null
  monthWorkingDays: null
  projectId: number
  projectName: string
  rate: null
  role: null
  startDate: string
  status: null
  totalDays: null
  totalValue: null
  userName: string
}
export type ProjectTabList = {
  id: number
  tabName: string
}

export type DownloadBtnProps = {
  projectRequestId: number
  token?: string
  tenantKey?: string
}
