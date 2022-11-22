import React from 'react'
import EmployeeDetails from './EmployeeDetails'
import OCard from '../../../components/ReusableComponent/OCard'

const ITDeclarationForm = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="IT Declaration Form"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <EmployeeDetails />
      </OCard>
    </>
  )
}

export default ITDeclarationForm
