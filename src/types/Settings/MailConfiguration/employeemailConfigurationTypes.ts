import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeGetEmailTemplate = {
  id: number
  templateName: string
  template: string
  templateTypeId: number
  templateType: string
  assetTypeId: null
  assetType: string
  email: null
}

export type EmployeeGetMailTemplateTypes = {
  id: string
  name: string
}

export type EmployeeMailconfigurationState = {
  employeeGetEmailTemplate: EmployeeGetEmailTemplate[]
  employeegetMailTemplateTypes: EmployeeGetMailTemplateTypes[]
  isLoading: LoadingState
  error: ValidationError
}
