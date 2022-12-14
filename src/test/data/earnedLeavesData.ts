import { LeaveSummary } from '../../types/Dashboard/EarnedLeaves/earnedLeavesTypes'

export const mockLeaveSummary: LeaveSummary = {
  allAvailableLeaves: 5,
  allCancelAfterApprovalLeaves: 0,
  allCreditedLeaves: 0,
  allLOPPendingLeaves: 0,
  allLOPTakenLeaves: 0,
  allPendingLeaves: 0,
  allScheduledLeaves: 0,
  allTakenLeaves: 10,
  calculatedCreditedLeaves: 0,
  carryForwardedLeaves: 0,
  leaveCategorySummaries: [
    {
      id: 1,
      leaveCategoryDTO: {
        id: 1,
        name: 'Casual',
        leaveType: 'EARNED',
      },
      daysPending: 0.0,
      daysTaken: 0.0,
      daysScheduled: 0.0,
      daysCancelAfterApprovalPending: 0.0,
    },
    {
      id: 2,
      leaveCategoryDTO: {
        id: 2,
        name: 'LOP',
        leaveType: 'LOP',
      },
      daysPending: 0.0,
      daysTaken: 0.0,
      daysScheduled: 0.0,
      daysCancelAfterApprovalPending: 0.0,
    },
    {
      id: 3,
      leaveCategoryDTO: {
        id: 3,
        name: 'PAID',
        leaveType: 'EARNED',
      },
      daysPending: 0.0,
      daysTaken: 0.0,
      daysScheduled: 0.0,
      daysCancelAfterApprovalPending: 0.0,
    },
  ],
}
