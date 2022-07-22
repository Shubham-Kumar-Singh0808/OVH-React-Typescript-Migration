import { LoadingState } from '../../../commonTypes'

export type MailTemplateType = {
  id: 5
  name: 'Support Management'
}

export type MailTemplateTypeState = {
  mailTemplateType: MailTemplateType[]
  isLoading: LoadingState
  currentPage: number
  pageSize: number
}
