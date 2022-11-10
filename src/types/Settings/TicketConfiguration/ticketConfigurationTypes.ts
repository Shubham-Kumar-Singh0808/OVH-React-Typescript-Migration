import { LoadingState, ValidationError } from '../../commonTypes'

export type SubCategoryListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  filterByDepartment: string
  filterByCategory: string
  filterBySubCategory: string
  isTableView: boolean
}

export type TicketConfigurationDepartments = {
  id: number
  name: string
}

export type TicketConfigurationCategories = {
  categoryId: number
  categoryName: string
  departmentId: number
  departmentName: string
  mealType: boolean
}

export type TicketConfigurationSubCategories = {
  subCategoryId: number
  subCategoryName: string
  estimatedTime: string
  workFlow: boolean
  categoryId: number
  categoryName: string
  departmentName: string
  departmentId: number
  levelOfHierarchy: string
}

export type TicketHistoryResponse = {
  size: number
  list: TicketHistory[]
}

export type TicketConfigurationState = {
  departments: TicketConfigurationDepartments[]
  categories: TicketConfigurationCategories[]
  subCategories: TicketConfigurationSubCategories[]
  subCategoryList: TicketConfigurationSubCategoryList
  selectedDepartment: string
  listSize: number
  ticketHistoryDetails: TicketHistoryResponse
  toggle: string
  isLoading: LoadingState
  error: ValidationError
  isLoadingFilterOptions: LoadingState
}

export type TicketConfigurationSubCategoryList = {
  size: number
  list?: TicketConfigurationList[]
}

export type TicketConfigurationSubCategoryType = {
  categoryId?: string
  departmentId: string
  subCategoryId?: string
  endIndex: number
  startIndex: number
}

export type TicketConfigurationList = {
  subCategoryId: number
  subCategoryName: string
  estimatedTime: number | string
  workFlow: boolean
  categoryId: number
  categoryName: string
  departmentName: string
  departmentId: number
  levelOfHierarchy: number | string
}

export type TicketHistory = {
  accessEndDate: null
  accessStartDate: null
  actualTime: null
  additionalInfo: null
  approvalStatus: null
  approvedByManager: null
  assignee: null
  columnName: null
  description: null
  documentsPath: null
  endDate: null
  estimatedTime: string
  id: null
  levelOfHierarchy: string
  modifiedBy: string
  modifiedDate: string
  oldAccessEndDate: null
  oldAccessStartDate: null
  oldactualTime: null
  oldapprovalStatus: null
  oldapprovedByManager: null
  oldassignee: null
  olddescription: null
  olddocumentsPath: null
  oldendDate: null
  oldestimatedTime: string
  oldlevelOfHierarchy: string
  oldpercentageDone: null
  oldpriority: null
  oldstartDate: null
  oldstatus: null
  oldsubCategoryName: null
  oldsubject: null
  oldticketsSubCategoryName: string
  oldtracker: null
  oldworkFlow: string
  percentageDone: null
  persistType: string
  priority: null
  startDate: null
  status: null
  subCategoryName: string
  subject: null
  ticketsSubCategoryName: null
  tracker: null
  workFlow: boolean | string
}

export type TicketHistoryProps = {
  filterName: string
  id: number
}
