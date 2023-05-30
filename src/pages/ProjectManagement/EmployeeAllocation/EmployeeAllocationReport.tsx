import React, { useState } from 'react'
import EmployeeAllocationFilterOptions from './EmployeeAllocationFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const EmployeeAllocation = (): JSX.Element => {
  const currentMonth = 'Current Month'
  const [Select, setSelect] = useState<string>(currentMonth)

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Employee Allocation Report"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <EmployeeAllocationFilterOptions Select={Select} setSelect={setSelect} />
    </OCard>
  )
}
export default EmployeeAllocation
