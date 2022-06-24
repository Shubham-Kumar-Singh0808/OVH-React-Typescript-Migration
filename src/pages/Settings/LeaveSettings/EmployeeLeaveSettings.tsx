import React, { useState } from 'react'
import EmployeeLeaveCalender from './EmployeeLeaveCalender'
import EmployeeLeaveCategories from './EmployeeLeaveCategories'
import OCard from '../../../components/ReusableComponent/OCard'
import AddEditLeaveCategories from './AddEditLeaveCategories'

const EmployeeLeaveSettings = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Leave Settings"
            CBodyClassName="ps-0 pe-0"
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
