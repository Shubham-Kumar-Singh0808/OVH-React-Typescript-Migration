import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const EarnedLeavesApplied = (): JSX.Element => {
  const employeeLeaveSummary = useTypedSelector(
    reduxServices.employeeLeaveSummary.selectors.employeeLeaveSummary,
  )

  return (
    <>
      <div className="leave-panel-body">
        <div className="leave-management">
          <div className="leave-widget">
            {employeeLeaveSummary?.leaveCategorySummaries
              ?.filter((leaveItem) => leaveItem.leaveCategoryDTO.name !== 'LOP')
              .map((leaveTypeItem, index) => {
                return (
                  <div className="status" key={index}>
                    <strong>
                      <p>{leaveTypeItem.leaveCategoryDTO.name}</p>
                    </strong>
                    <p>{leaveTypeItem.daysTaken}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default EarnedLeavesApplied
