import { LoadingState } from '../../commonTypes'

export type DepartmentNameList = {
  id: number
  name: string
}

export type GetTicketsReport = {
  size: number
  list: GetTicketsReportList[]
}

export type GetTicketsReportList = {
  trackerName: string
  categoryName: string
  subCategoryName: string
  noOfTickets: string | number
  noOfClosedTickets: string | number
  noOfPendingTickets: string | number
  categoryId: number
  subCategoryId: number
  trackerId: number
  status: null
}

export type DepartmentCategoryList = {
  categoryId: number
  categoryName: string
  departmentId: string
  departmentName: string
  mealType: boolean
}

export type TicketReportSliceState = {
  currentPage: number
  pageSize: number
  ticketsReportList: GetTicketsReportList[]
  departmentNameList: DepartmentNameList[]
  departmentCategoryList: DepartmentCategoryList[]
  getTicketsReport: GetTicketsReport
  isLoading: LoadingState
  getTicketDetails: GetTicketDetails
  ticketsDetailsList: GetTicketsDetailsList[]
  DepartmentName: string
  DateValue: string
  FromDate: string | Date
  ToDate: string | Date
}

export type TicketReportApiProps = {
  dateSelection: string
  departmentId: string
  from: string
  ticketStatus: string | null
  to: string
  startIndex?: number
  endIndex?: number
}

export type GetTicketDetails = {
  size: number
  list: GetTicketsDetailsList[]
}

export type GetTicketsDetailsList = {
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
  filePath: null
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

export type TicketDetailsProps = {
  categoryId: number
  dateSelection: string
  departmentId: string
  endIndex: number
  filter: string
  from: string
  startIndex: number
  subCategoryId: number
  ticketStatus: string
  to: string
  trackerId: number
}

export type TicketDetailsTableProps = {
  backButtonHandler: () => void
}
