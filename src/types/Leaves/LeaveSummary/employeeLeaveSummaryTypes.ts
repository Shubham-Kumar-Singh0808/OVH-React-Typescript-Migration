import { LoadingState, ValidationError } from '../../commonTypes'

export type LeaveSummary = {
  allAvailableLeaves: number
  allCancelAfterApprovalLeaves: number
  allCreditedLeaves: number
  allLOPPendingLeaves: number
  allLOPTakenLeaves: number
  allPendingLeaves: number
  allScheduledLeaves: number
  allTakenLeaves: number
  calculatedCreditedLeaves: number
  carryForwardedLeaves: number
  leaveCategorySummaries: LeaveCategorySummary[]
}

export type LeaveCategoryDTO = {
  id: number
  leaveType: string
  name: string
}
export type LeaveCategorySummary = {
  daysCancelAfterApprovalPending: number
  daysPending: number
  daysScheduled: number
  daysTaken: number
  id: number
  leaveCategoryDTO: LeaveCategoryDTO
}
export type LeaveHistory = {
  id: number
  employeeComments: string
  managerComments: string
  status: string
  from: string
  to: string
  numberOfDays: number
  appliedDate: string
  canBeCancelledAfterApproval: boolean
  approvedBy: string
  leaveCategoryDTO: LeaveCategoryDTO
}

export type EmployeeLeaveHistoryResponse = {
  list: LeaveHistory[]
  size: number
}

export type LeaveHistoryApiProps = {
  startIndex?: number
  endIndex?: number
}

export type LeaveHistoryTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type EmployeeLeaveSummarySliceState = {
  employeeLeaveSummary: LeaveSummary
  employeeLeaveHistory: LeaveHistory[]
  list: number
  isLoading: LoadingState
  error: ValidationError
}
