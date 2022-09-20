import React from 'react'
import EmployeeAllocationFilterOptions from './EmployeeAllocationFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const EmployeeAllocation = (): JSX.Element => {
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Employee Allocation Report"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <EmployeeAllocationFilterOptions />
    </OCard>
  )
}
export default EmployeeAllocation
