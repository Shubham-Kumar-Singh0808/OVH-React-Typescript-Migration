import OCard from '../../components/ReusableComponent/OCard'
import React, { useEffect } from 'react'
import HandbookList from './HandbookList'

const EmployeeHandbook = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Handbook"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <HandbookList />
      </OCard>
    </>
  )
}

export default EmployeeHandbook
