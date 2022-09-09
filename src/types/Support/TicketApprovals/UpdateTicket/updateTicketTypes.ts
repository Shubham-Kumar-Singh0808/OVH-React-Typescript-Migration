import { ApiLoadingState } from '../../../../middleware/api/apiList'

export type GetTicketToEdit = {
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
  endDate: string | null
  assigneeId: number | null
  employeeName: string
  percentageDone: string
  actualTime: string
  authorName: string
  assigneeName: string | null
  approvalStatus: string
  filePath: string
  estimatedTime: string
  watcherIds: null
  watcherNames: string[]
  disableApprove: boolean
  disableCancel: boolean
  tracker: number
  trackerName: string
  accessStartDate: string
  accessEndDate: string
  createdDate: string
  approvedBy: string
}

export type GetActiveEmployee = {
  employeeId: number
  empFirstName: string
  empLastName: string
  projectName: string | null
  projectId: number | null
  startDate: string | null
  endDate: string | null
  billable: boolean | null
  comments: string | null
  department: string | null
  desigination: string | null
  userName: string | null
  isAllocated: null
  duration: null
  count: number | null
  rate: null
  role: string | null
  amount: null
  empName: string | null
  status: string | null
  monthWorkingDays: null
  holidays: null
  leaves: null
  totalDays: null
  hours: string | null
  totalValue: null
  allocation: null
}

export type GetAudit = {
  id: number | null
  ticketsSubCategoryName: string | null
  subject: string | null
  description: string | null
  status: string | null
  priority: string | null
  startDate: string | null
  endDate: string | null
  assignee: string | null
  percentageDone: string | null
  actualTime: string | null
  documentsPath: string | null
  approvalStatus: string | null
  oldticketsSubCategoryName: string | null
  oldsubject: string | null
  olddescription: string | null
  oldstatus: string | null
  oldpriority: string | null
  oldstartDate: string | null
  oldendDate: string | null
  oldassignee: string | null
  oldpercentageDone: string | null
  oldactualTime: string | null
  olddocumentsPath: string | null
  oldapprovalStatus: string | null
  modifiedDate: string
  modifiedBy: string
  persistType: string
  columnName: string | null
  additionalInfo: string | null
  subCategoryName: string | null
  estimatedTime: string | null
  workFlow: string | null
  oldsubCategoryName: string | null
  oldestimatedTime: string | null
  oldworkFlow: string | null
  approvedByManager: string | null
  levelOfHierarchy: number | null
  oldlevelOfHierarchy: number | null
  tracker: string | null
  oldtracker: string | null
  accessStartDate: string | null
  oldAccessStartDate: string | null
  accessEndDate: string | null
  oldapprovedByManager: string | null
  oldAccessEndDate: string | null
}

export type UpdateTicketSliceState = {
  isLoading: ApiLoadingState
  activeEmployees: GetActiveEmployee[]
  auditDetails: GetAudit[]
  ticketDetailsToEdit: GetTicketToEdit
}
