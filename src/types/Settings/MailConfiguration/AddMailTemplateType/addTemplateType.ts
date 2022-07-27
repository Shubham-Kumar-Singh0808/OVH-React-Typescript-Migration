import { LoadingState } from '../../../commonTypes'

export type MailTemplateType = {
  id: number
  name: string
}

export type MailTemplateTypeState = {
  mailTemplateType: MailTemplateType[]
  isLoading: LoadingState
  currentPage: number
  pageSize: number
}
