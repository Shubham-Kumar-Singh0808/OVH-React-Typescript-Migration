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

export type ProjectsManagementSliceState = {
  projectClients: ProjectClients[]
  isLoading: LoadingState
  error: ValidationError
}
