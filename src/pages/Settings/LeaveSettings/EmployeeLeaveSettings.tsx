import React from 'react'
import EmployeeLeaveCalender from './EmployeeLeaveCalender'
import EmployeeLeaveCategories from './EmployeeLeaveCategories'
import OCard from '../../../components/ReusableComponent/OCard'

const EmployeeLeaveSettings = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Leave Settings"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <EmployeeLeaveCalender />
        <EmployeeLeaveCategories />
      </OCard>
    </>
  )
}
export default EmployeeLeaveSettings
