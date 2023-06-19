import { ApiLoadingState } from '../../../middleware/api/apiList'

export type DepartmentList = {
  id: number
  name: string
}

export type TrackerList = {
  id: number
  name: string
  permission: boolean
}

export type DepartmentCategoryList = {
  categoryId: number
  categoryName: string
  departmentId: number
  departmentName: string
  mealType: boolean
}

export type SubCategoryList = {
  subCategoryId: number
  subCategoryName: string
  estimatedTime: string
  workFlow: boolean
  categoryId: number
  categoryName: string
  departmentName: string
  departmentId: number
  levelOfHierarchy: null | string
}

export type TicketApprovalsSliceState = {
  isLoading: ApiLoadingState
  departmentNameList: DepartmentList[]
  trackerList: TrackerList[]
  departmentCategoryList: DepartmentCategoryList[]
  mealType: DepartmentCategoryList
  subCategoryList: SubCategoryList[]
  ticketsForApproval: GetAllTicketsForApprovalResponse
  getAllLookUps: GetAllLookUps[]
  selectedTicketId: number
  toggleValue: string
  routePath: string

  TicketStatusValue: string
  ApprovalStatusValue: string
  DepartmentNameValue: string | number
  CategoryNameValue: string | number
  SubCategoryNameValue: string | number
  DateValue: string
  TrackerValue: string | number
  FormDate: string | Date
  ToDate: string | Date
}

export type GetAllTicketsForApprovalProps = {
  categoryId?: number
  dateSelection: string
  departmentId?: number
  endIndex: number
  fromDate?: string
  multiSearch?: string
  progressStatus: string
  searchByAssigneeName: boolean
  searchByEmpName: boolean
  startIndex: number
  subCategoryId?: number
  ticketStatus: string
  toDate?: string
  trackerID?: number
}

export type TicketForApproval = {
  id: number
  departmentId: number
  departmentName: string
  categoryId: number
  categoryName: string
  subCategoryId: number
  subCategoryName: string
  subject: string
  description: null | string
  status: string
  priority: string
  startDate: string
  endDate: string
  assigneeId: null | number
  employeeName: string
  percentageDone: number
  actualTime: string
  authorName: string
  assigneeName: null | string
  approvalStatus: string
  filePath: null | string
  estimatedTime: string
  watcherIds: null | number[]
  watcherNames: string[]
  disableApprove: boolean
  disableCancel: boolean
  tracker: number
  trackerName: string
  accessStartDate: null | string
  accessEndDate: null | string
  createdDate: string
  approvedBy: string
}

export type GetAllTicketsForApprovalResponse = {
  size: number
  list: TicketForApproval[]
}

export type GetAllLookUps = {
  categoryId: number
  categoryName: string
  departmentId: number
  departmentName: string
  mealType: boolean
}
