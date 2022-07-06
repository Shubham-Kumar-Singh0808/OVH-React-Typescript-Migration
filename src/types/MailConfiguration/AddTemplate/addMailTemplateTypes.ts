import { LoadingState, ValidationError } from '../../commonTypes'

export type MailTemplateType = {
  id: number
  name: string
}

export type AddTemplateSliceState = {
  mailTemplateTypes: MailTemplateType[]
  isLoading: LoadingState
  error: ValidationError
}
