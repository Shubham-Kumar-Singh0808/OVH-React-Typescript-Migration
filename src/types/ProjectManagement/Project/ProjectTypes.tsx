// hrm-ws/project-mgmt/activeProjectsForEmployee

import { LoadingState, ValidationError } from '../../commonTypes'

type List = {
  label: string
  name: string
}

export interface ProjectFilterProps {
  list: List[]
  label: string
  name: string
  placeHolder?: string
  value?: string
  onChange: (value: string) => void
}

export type ProjectDetails = {
  Projsize: number
  Projs: ProjectReport[]
}

export type ProjectReportQueryParams = {
  employeeId?: number
  endIndex: number
  enddate?: string
  firstIndex: number
  health: string
  intrnalOrNot?: boolean
  multiSearch?: string
  projectDatePeriod?: string
  projectStatus: string
  startdate?: string
  type: string
}

export type ProjectReport = {
  address?: string | null
  allocation?: string | null
  bcc?: string | null
  billable: boolean
  billingContactPerson?: string | null
  billingContactPersonEmail?: string | null
  cc?: string | null
  checkListExist?: boolean | null
  client: string
  clientId: 91
  clientName?: string | null
  count: 6
  country?: string | null
  deliveryManager: string
  description: string
  domain?: string | null
  email?: string | null
  employeeId?: number | null
  enddate: string
  health: string
  hiveProjectFlag?: string | null
  hiveProjectName?: string | null
  id: 330
  intrnalOrNot?: string | null
  isAllocated?: boolean
  managerId: number
  managerName: string
  model: string
  newClient: string
  organization: string
  personName: string
  platform: string
  projectCode: string
  projectContactEmail: string
  projectContactPerson: string
  projectEndDate?: string | null
  projectName: string
  projectRequestId: 207
  projectRequestMilestoneDTO?: string | null
  projectStartdate?: string | null
  requestedBy?: string | null
  requiredResources?: string | null
  startdate: string
  statuEditFlag?: string | null
  status: string
  technology?: string | null
  type: string
}

export type ProjectsReportSliceState = {
  ProjectDetails: ProjectDetails
  isLoading: LoadingState
  error: ValidationError
}
