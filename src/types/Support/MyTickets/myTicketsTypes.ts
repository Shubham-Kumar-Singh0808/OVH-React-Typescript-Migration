import { ApiLoadingState } from '../../../middleware/api/apiList'

export type MyTicket = {
  id: number
  departmentId: number
  departmentName: string
  categoryId: number
  categoryName: string
  subCategoryId: number
  subCategoryName: string
  subject: string
  description: string
  status: string
  priority: string
  startDate: string
  endDate: string
  assigneeId: number
  employeeName: string
  percentageDone: number
  actualTime: string
  authorName: string
  assigneeName: string
  approvalStatus: string
  filePath: string
  estimatedTime: string
  watcherIds: null
  watcherNames: []
  disableApprove: true
  disableCancel: false
  tracker: number
  trackerName: string
  accessStartDate: string
  accessEndDate: string
  createdDate: string
  approvedBy: string
}

export type GetMyTicketsResponse = {
  size: number
  list: MyTicket[]
}

export type MyTicketsSliceState = {
  ticketList: GetMyTicketsResponse
  allTickets: MyTicket[]
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
}

export type GetTicketsProps = {
  endIndex?: number
  multiSearch: string
  startIndex?: number
}
