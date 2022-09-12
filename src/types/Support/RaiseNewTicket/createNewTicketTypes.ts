import { ApiLoadingState } from '../../../middleware/api/apiList'

export type CreateNewTicket = {
  accessEndDate: string
  accessStartDate: string
  categoryId: number
  description: string
  id: number
  priority: string
  startDate: string
  subCategoryId: number
  subject: string
  tracker: number
  watcherIds: []
}

export type createNewTicketSliceState = {
  isLoading: ApiLoadingState
  createNewTicket: CreateNewTicket
}
