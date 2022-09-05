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
  id: null
  ticketsSubCategoryName: null
  subject: null
  description: null
  status: null
  priority: null
  startDate: null
  endDate: null
  assignee: null
  percentageDone: null
  actualTime: null
  documentsPath: null
  approvalStatus: string
  oldticketsSubCategoryName: null
  oldsubject: null
  olddescription: null
  oldstatus: null
  oldpriority: null
  oldstartDate: null
  oldendDate: null
  oldassignee: null
  oldpercentageDone: null
  oldactualTime: null
  olddocumentsPath: null
  oldapprovalStatus: string
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
  tracker: null
  oldtracker: null
  accessStartDate: null
  oldAccessStartDate: null
  accessEndDate: null
  oldapprovedByManager: null
  oldAccessEndDate: null
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
  backButtonHandler: () => void
}
