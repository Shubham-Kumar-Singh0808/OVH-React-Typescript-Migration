import React from 'react'
import LeaveApprovalFilterOptions from './LeaveApprovalFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const LeaveApprovals = () => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Leave Approvals"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <LeaveApprovalFilterOptions />
      </OCard>
    </>
  )
}

export default LeaveApprovals
