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
  endDate: null
  assigneeId: null
  employeeName: string
  percentageDone: number
  actualTime: string
  authorName: string
  assigneeName: null
  approvalStatus: string
  filePath: string
  estimatedTime: string
  watcherIds: null
  watcherNames: []
  disableApprove: true
  disableCancel: false
  tracker: 1
  trackerName: string
  accessStartDate: string
  accessEndDate: string
  createdDate: string
  approvedBy: string
}

export type GetMyTicketsResponse = {
  list: MyTicket[]
  size: number
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
