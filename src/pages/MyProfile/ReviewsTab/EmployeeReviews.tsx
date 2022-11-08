import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React from 'react'
import EmployeeReviewTable from './EmployeeReviewTable'

const EmployeeReviews = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Review List</h4>
      </CCardHeader>
      <CCardBody className="mt-3">
        <EmployeeReviewTable />
      </CCardBody>
    </>
  )
}

export default EmployeeReviews
