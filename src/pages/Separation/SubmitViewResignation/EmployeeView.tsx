import React, { useState } from 'react'
import EmployeeViewFilterOptions from './EmployeeViewFilterOptions'
import SubmitResignation from './SubmitResignation'
import OCard from '../../../components/ReusableComponent/OCard'

const EmployeeView = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Employee View"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <EmployeeViewFilterOptions setToggle={setToggle} />
          </OCard>
        </>
      )}
      {toggle === 'submitResignation' && <SubmitResignation />}
    </>
  )
}

export default EmployeeView
