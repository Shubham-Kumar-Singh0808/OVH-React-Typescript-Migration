import { LoadingState, ValidationError } from '../../../commonTypes'
import { DynamicFormLabelProps } from '../../../EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

export type GetAutoCompleteList = {
  id: number
  name: string
}

export type GetOnSelect = {
  id: number
  name: string
}

export interface AutoCompleteProps extends DynamicFormLabelProps {
  list: GetAutoCompleteList[]
  onSelect: (value: GetOnSelect) => void
  shouldReset: boolean
  value: string
  isRequired: boolean
  label: string
  placeholder: string
  name: string
}

export type ProjectClients = {
  id: number
  name: string
}

export type PlatForms = {
  id: number
  name: string
}

export type Domains = {
  id: number
  name: string
}

export type Managers = {
  id: number
  firstName: string
  lastName: string
  middleName: string
}

export type ProjectDetail = {
  client: string
  description: string
  enddate: string
  health: string
  hiveProjectName: string
  intrnalOrNot: boolean
  managerId: number
  model: string
  projectName: string
  startdate: string
  status: string
  type: string
}

export type Project = {
  address?: string
  allocation?: string
  bcc?: string
  billable: boolean
  billingContactPerson: string
  billingContactPersonEmail: string
  cc?: string
  checkListExist?: string
  client: string
  clientId?: string
  clientName: string
  count?: string
  country?: string
  deliveryManager?: string
  description: string
  domain: string
  email?: string
  employeeId?: string
  enddate: string
  health?: string
  hiveProjectFlag: boolean
  hiveProjectName: string
  id: number
  intrnalOrNot: boolean
  isAllocated?: string
  managerId: number
  managerName: string
  model: string
  newClient?: string
  organization?: string
  personName?: string
  platform: string
  projectCode?: string
  projectContactEmail: string
  projectContactPerson: string
  projectEndDate?: string
  projectName: string
  projectRequestId: number
  projectRequestMilestoneDTO?: string
  projectStartdate?: string
  requestedBy?: string
  requiredResources?: string
  startdate: string
  statuEditFlag: string
  status: string
  technology?: string
  type: string
}

export type ProjectsManagementSliceState = {
  projectClients: ProjectClients[]
  projectDetail: ProjectDetail
  project: Project
  platForms: PlatForms[]
  domains: Domains[]
  managers: Managers[]
  isLoading: LoadingState
  error: ValidationError
}
