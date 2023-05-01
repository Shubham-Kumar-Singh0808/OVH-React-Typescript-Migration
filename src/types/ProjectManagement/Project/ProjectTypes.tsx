import { ProjectDetails as ProjectInfo } from '../../MyProfile/ProjectsTab/employeeProjectTypes'
import { LoadingState, ValidationError } from '../../commonTypes'
import { UserAccessToFeatures } from '../../Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

type List = {
  label: string
  name: string
  backgroundColor?: string
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

export type ProjectReportsTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  updateaccess?: boolean
  isCloseBtnVisible: boolean
  userAccess: UserAccessToFeatures
}

export type ProjectsReportSliceState = {
  ProjectDetails: ProjectDetails
  Clients: ProjectReport[]
  ClientProjects: ProjectInfo[]
  isProjectLoading: LoadingState
  isClientProjectLoading: LoadingState
  listSize: number
  error: ValidationError

  SelectValue: string
  StatusValue: string
  PricingModel: string
  ProjectHealth: string

  customFromValue: string | Date
  customToValue: string | Date
}

export type CloseProjectType = {
  id?: number
  projectName?: string
  isCloseModelVisible: boolean
}

export type DeleteProjectType = {
  id?: number
  projectName?: string
  isDeleteModelVisible: boolean
}

export type DeallocationProjectType = {
  data?: ProjectInfo
  projectId?: number
  isDeallocatedModelVisible: boolean
}

export type AllocationProjectType = {
  data?: ProjectInfo
  projectId?: number
  isAllocatedVisible: boolean
}

export type SubProjectType = {
  allocation?: number
  billable?: string
  isAllocated?: boolean
}
