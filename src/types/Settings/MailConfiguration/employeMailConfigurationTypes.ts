import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeMailTemplate = {
  id: number
  templateName: string
  template: string
  templateTypeId: number
  templateType: string
  assetTypeId: string
  assetType: string
  email: string
}

export type EditEmployeeMailTemplate = {
  id: number
  templateName: string
  template: string
  templateTypeId: number
  templateType: string
  assetTypeId: string
  assetType: string
  email: string
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
  editEmployeeTemplate: EditEmployeeMailTemplate
  editTemplateButtonHandler: (
    id: number,
    templateName: string,
    template: string,
    templateTypeId: number,
    templateType: string,
    assetTypeId: string,
    assetType: string,
    email: string,
  ) => void
}

export type EditTemplateProps = {
  backButtonHandler: () => void
  editEmployeeTemplate: EditEmployeeMailTemplate
  setEditEmployeeTemplate: React.Dispatch<
    React.SetStateAction<EditEmployeeMailTemplate>
  >
}
