import React, { useState } from 'react'
import EmployeeAllocationFilterOptions from './EmployeeAllocationFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeAllocation = (): JSX.Element => {
  const currentMonth = 'Current Month'
  const [Select, setSelect] = useState<string>(currentMonth)
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Hierarchy Employee Allocation',
  )

  const userAccessForIndividual = userAccessToFeatures?.find(
    (feature) => feature.name === ' Individual Employee Allocation',
  )

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
