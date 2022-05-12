import { CCardHeader } from '@coreui/react-pro'
import ProfileHistoryTimeLine from './ProfileHistoryTimeLine'
import React from 'react'

const EmployeeProfileHistory = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Employee Profile History</h4>
      </CCardHeader>
      <ProfileHistoryTimeLine />
    </>
  )
}

export default EmployeeProfileHistory
