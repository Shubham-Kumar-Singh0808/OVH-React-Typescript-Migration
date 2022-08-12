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
  departmentNameList: DepartmentNameList[]
  departmentCategoryList: DepartmentCategoryList[]
  getTicketsReport: GetTicketsReport
  isLoading: LoadingState
}

export type TicketReportApiProps = {
  dateSelection: string
  departmentId: number
  from: string
  ticketStatus: null
  to: string
}
