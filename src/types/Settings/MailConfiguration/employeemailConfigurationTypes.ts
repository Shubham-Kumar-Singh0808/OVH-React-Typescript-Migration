import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeGetEmailTemplate = {
  id: number | string
  templateName: string
  template: string
  templateTypeId: number | string
  templateType: string
  assetTypeId: null | string
  assetType: string
  email: null | string
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
  templateName: string | undefined
  templateTypeId: number | string | undefined
}
