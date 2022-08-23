import { ApiLoadingState } from '../../../middleware/api/apiList'

export type Client = {
  id: number
  clientCode: string
  name: string
  address: string
  personName: string
  email: string
  country: string
  phone: null | string
  description: null | string
  organization: string
  totalFixedBids: number
  totalRetainers: number
  clientStatus: boolean
  gstCode: null | string
}

export type GetClientsResponse = {
  clients: Client[]
  totalClients: number
}

export type ProjectsUnderClient = {
  id: number
  projectName: string
  managerId: number
  startdate: string
  enddate: string
  description: string
  status: string
  managerName: string
  count: number
  billable: boolean
  isAllocated: null
  employeeId: null
  health: string
  client: string
  type: string
  clientId: null | number
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
  hiveProjectName: string
  cc: null | string
  bcc: null | string
  deliveryManager: string
  projectRequestId: null
  model: null | string
  checkListExist: null
  projectCode: string
  projectContactPerson: null
  projectContactEmail: null | string
  billingContactPerson: null | string
  billingContactPersonEmail: null | string
  projectRequestMilestoneDTO: null
  platform: null | string
  domain: null | string
  clientName: null | string
  hiveProjectFlag: null
  allocation: null
}

export enum ClientStatus {
  'all' = 'All',
  'active' = 'Active',
  'inactive' = 'InActive',
}

export type GetClientsProps = {
  endIndex: number
  selectionStatus: string
  startIndex: number
  searchText?: string
}

export type ClientsSliceState = {
  selectedClientStatus: ClientStatus
  clientsList: GetClientsResponse
  projectsUnderClient: ProjectsUnderClient[]
  isLoading: ApiLoadingState
  isLoadingProjectDetails: ApiLoadingState
}
