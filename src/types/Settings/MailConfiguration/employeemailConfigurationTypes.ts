import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeGetEmailTemplate = {
  id: number
  templateName?: string
  template: string
  templateTypeId?: number | string
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
  employeeGetMailTemplateTypes: EmployeeGetMailTemplateTypes[]
  isLoading: LoadingState
  error: ValidationError
}

export type EmployeeGetEmailTemplateProps = {
  templateName?: string
  templateTypeId?: number | string
}
