import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeMailTemplate = {
  id: number
  templateName: string
  template: string
  templateTypeId: number | string
  templateType?: string
  assetTypeId?: null | string
  assetType?: string
  email?: null | string
}

export type EmployeeMailTemplateType = {
  id: string | number
  name: string
}

export type EmployeeMailConfigurationState = {
  employeeGetEmailTemplate: EmployeeMailTemplate[]
  employeeGetMailTemplateTypes: EmployeeMailTemplateType[]
  isLoading: LoadingState
  error: ValidationError
}

export type EmployeeGetEmailTemplateProps = {
  templateName: string | undefined
  templateTypeId: number | string | undefined
}

export type EmployeeGetEmailTemplateModelProps = {
  emailTemplate: string
  emailTemplateName: string
}

export type EmployeeEmailTemplateTableProps = {
  employeeTemplate: EmployeeMailTemplate
}
