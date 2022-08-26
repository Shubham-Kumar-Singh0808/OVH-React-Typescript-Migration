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
  noOfTickets: string
  noOfClosedTickets: string
  noOfPendingTickets: string
  categoryId: number
  subCategoryId: number
  trackerId: number
  status: null
}

export type DepartmentCategoryList = {
  categoryId: number
  categoryName: string
  departmentId: number
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
}

export type TicketReportApiProps = {
  dateSelection: string
  departmentId: number | string
  from: string
  ticketStatus: null
  to: string
}

export type GetTicketDetails = {
  size: number
  list: GetTicketsDetailsList[]
}

export type GetTicketsDetailsList = {
  id: 19093
  departmentId: 1
  departmentName: 'Networking'
  categoryId: 9
  categoryName: 'Access'
  subCategoryId: 56
  subCategoryName: 'Create new Git Repository'
  subject: 'tset'
  description: 'tsdds'
  status: 'New'
  priority: 'Normal'
  startDate: '26/08/2022'
  endDate: null
  assigneeId: null
  employeeName: 'Admin Rbt'
  percentageDone: 0
  actualTime: '0.00'
  authorName: 'Admin Rbt'
  assigneeName: null
  approvalStatus: 'N/A'
  filePath: null
  estimatedTime: '1.00'
  watcherIds: null
  watcherNames: []
  disableApprove: true
  disableCancel: false
  tracker: 1
  trackerName: 'Issue'
  accessStartDate: '26/08/2022'
  accessEndDate: '27/08/2022'
  createdDate: '26/08/2022 (11:44)'
  approvedBy: 'N/A'
}

export type TicketDetailsProps = {
  categoryId: number
  dateSelection: string
  departmentId: number | string
  endIndex: number
  filter: string
  from: string
  startIndex: number
  subCategoryId: number
  ticketStatus: string
  to: string
  trackerId: number
}
