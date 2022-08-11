import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { LeaveCategorySummary } from '../../../../types/Leaves/LeaveSummary/employeeLeaveSummaryTypes'

const EarnedLeavesApplied = (): JSX.Element => {
  const employeeLeaveSummary = useTypedSelector(
    reduxServices.employeeLeaveSummary.selectors.employeeLeaveSummary,
  )

  const findEarnedPaidLeaves = (paidLeave: LeaveCategorySummary[]) => {
    const result = paidLeave?.find(
      (leave) => leave.leaveCategoryDTO.name === 'PAID',
    )
    return result ? result.daysTaken + result.daysPending : 0
  }

  const findEarnedCasualLeaves = (casualLeave: LeaveCategorySummary[]) => {
    const result = casualLeave?.find(
      (leave) => leave.leaveCategoryDTO.name === 'Casual',
    )
    return result ? result.daysTaken + result.daysPending : 0
  }

  return (
    <>
      <div className="panel-body">
        <div className="leave-management">
          <div className="leave-widget">
            <div className="status">
              <strong>
                <p>Casual</p>
              </strong>
              <p>
                {findEarnedCasualLeaves(
                  employeeLeaveSummary.leaveCategorySummaries,
                )}
              </p>
            </div>
            <div className="status">
              <strong>
                <p>PAID</p>
              </strong>
              <p>
                {findEarnedPaidLeaves(
                  employeeLeaveSummary.leaveCategorySummaries,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EarnedLeavesApplied
