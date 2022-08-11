import React from 'react'
import EmployeeApplyLeaveFilterOptions from './EmployeeApplyLeaveFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const EmployeeApplyLeave = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Apply For Leave"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <EmployeeApplyLeaveFilterOptions />
      </OCard>
    </>
  )
}
export default EmployeeApplyLeave
