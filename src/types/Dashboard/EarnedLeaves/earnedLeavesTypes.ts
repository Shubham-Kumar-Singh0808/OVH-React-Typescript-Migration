import { LoadingState, ValidationError } from '../../commonTypes'

export type FinancialYear = {
  value: number
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

export type EarnedLeavesSliceState = {
  financialYear: number
  leaveSummary: LeaveSummary
  isLoading: LoadingState
  error: ValidationError
}
