import { LoadingState } from '../../commonTypes'

export type CheckList = {
  id: number
  name: string
  answer: string
  answer1: null
  answer2: null
  answer3: null
  comments: string
  checklistId: number
}

export type ProjectRequestMilestoneDTO = {
  id: number
  title: string
  effort: string
  fromDate: string
  toDate: string
  comments: string
  billable: true
  milestonePercentage: string
}

export type ProjectRequestList = {
  id: number
  projectName: string
  managerId: number
  startdate: string
  enddate: string
  description: string
  requiredResources: string
  status: string
  managerName: string
  client: string
  type: string
  clientId: null
  newClient: null
  requestedBy: string
  technology: string
  address: null
  personName: null
  email: null
  country: ''
  organization: null
  intrnalOrNot: boolean
  cc: ''
  bcc: ''
  chelist: CheckList[]
  model: string
  checkListExist: boolean
  projectContactPerson: string
  projectContactEmail: string
  billingContactPerson: string
  billingContactPersonEmail: string
  projectRequestMilestoneDTO: ProjectRequestMilestoneDTO[]
  platform: string
  access: true
  domain: string
}

export type GetAllProjectRequestList = {
  projectrequestList: ProjectRequestList[]
  projectRequestListSize: number
}

export type GetAllProjectRequestListProps = {
  endIndex: number
  firstIndex: number
  multiSearch: string
}

export type ProjectCreationRequestState = {
  getAllProjectRequestList: GetAllProjectRequestList
  getProjectRequest: GetProjectRequest
  projectRequestHistoryDetails: ProjectRequestHistoryDetails[]
  approveProjectRequest: ApproveProjectRequest
  isLoading: LoadingState
  currentPage: number
  pageSize: number
}
export type GetProjectRequest = {
  id: number
  projectName: string
  managerId: number
  startdate: string
  enddate: string
  description: string
  requiredResources: string
  status: string
  managerName: string
  client: string
  type: string
  clientId: null
  newClient: null
  requestedBy: string
  technology: string
  address: null
  personName: null
  email: null
  country: string
  organization: null
  intrnalOrNot: boolean
  cc: string
  bcc: string
  chelist: CheckList[]
  model: string
  checkListExist: true
  projectContactPerson: string
  projectContactEmail: string
  billingContactPerson: string
  billingContactPersonEmail: string
  projectRequestMilestoneDTO: ProjectRequestMilestoneDTO[]
  platform: string
  access: true
  domain: string
}

export type ProjectRequestHistoryDetails = {
  oldValue: null
  newValue: null
  modifiedDate: string
  modifiedBy: number
  persistType: string
  referenceId: number
  additionalInfo: null
  employeeName: string
  auditId: number
}

export type ApproveProjectRequest = {
  id?: number
  projectName: string
  managerId: number
  startdate: string
  enddate: string
  description: string
  requiredResources: string
  status: string
  managerName: string
  client: string
  type: string
  clientId: null | string
  newClient: null | string
  requestedBy: string
  technology: string
  address: null | string
  personName: null
  email: null | string
  country: string
  organization: null
  intrnalOrNot: boolean
  cc: string
  bcc: string
  model: string
  checkListExist: boolean
  projectContactPerson: string
  projectContactEmail: string
  billingContactPerson: string
  billingContactPersonEmail: string
  projectRequestId: number
  projectRequestMilestoneDTO: ProjectRequestMilestoneDTO[]
  platform: string
  // access: boolean
  domain: string
  health?: string
}

export type RejectProjectRequestProps = {
  comment: string
  requestId: number
}
