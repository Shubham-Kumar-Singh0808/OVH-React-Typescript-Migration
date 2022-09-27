import React, { useState } from 'react'
import EmployeeLeaveCalender from './EmployeeLeaveCalender'
import EmployeeLeaveCategories from './EmployeeLeaveCategories'
import AddEditLeaveCategories from './AddLeaveCategories'
import OCard from '../../../components/ReusableComponent/OCard'

const EmployeeLeaveSettings = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Leave Settings"
            CFooterClassName="d-none"
          >
            <EmployeeLeaveCalender />
            <EmployeeLeaveCategories setToggle={setToggle} />
          </OCard>
        </>
      )}
      {toggle === 'addLeaveCategory' && (
        <AddEditLeaveCategories
          backButtonHandler={() => setToggle('')}
          confirmButtonText="Add"
        />
      )}
    </>
  )
}
export default EmployeeLeaveSettings
