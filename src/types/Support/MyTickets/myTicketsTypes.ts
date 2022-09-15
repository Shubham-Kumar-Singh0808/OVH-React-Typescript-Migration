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
  ticketHistory: GetMyTicketHistoryResponse
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

export type TicketHistory = {
  id: null | number
  ticketsSubCategoryName: null | string
  subject: null | string
  description: null | string
  status: null | string
  priority: null | string
  startDate: null | string
  endDate: null | string
  assignee: null | string
  percentageDone: null | string
  actualTime: null | string
  documentsPath: null
  approvalStatus: string
  oldticketsSubCategoryName: null
  oldsubject: null | string
  olddescription: null | string
  oldstatus: null | string
  oldpriority: null | string
  oldstartDate: null | string
  oldendDate: null | string
  oldassignee: null | string
  oldpercentageDone: null | string
  oldactualTime: null | string
  olddocumentsPath: null
  oldapprovalStatus: string | null
  modifiedDate: string
  modifiedBy: string
  persistType: string
  columnName: null
  additionalInfo: null
  subCategoryName: null
  estimatedTime: null
  workFlow: null
  oldsubCategoryName: null
  oldestimatedTime: null
  oldworkFlow: null
  approvedByManager: null
  levelOfHierarchy: null
  oldlevelOfHierarchy: null
  tracker: string
  oldtracker: string | null
  accessStartDate: string
  oldAccessStartDate: string | null
  accessEndDate: string
  oldapprovedByManager: string | null
  oldAccessEndDate: string | null
}

export type GetMyTicketHistoryResponse = {
  size: number
  list: TicketHistory[]
}

export type TicketHistoryProps = {
  filterName: string
  id: number
}

export type TicketHistoryDetailsProps = {
  backButtonHandler?: () => void
}
