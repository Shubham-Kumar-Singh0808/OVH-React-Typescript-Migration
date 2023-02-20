import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React from 'react'
import parse from 'html-react-parser'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const EmployeeRatingDetails = (): JSX.Element => {
  const reviewPage = useTypedSelector(
    reduxServices.myReview.selectors.reviewPage,
  )
  return (
    <>
      <CCardHeader className="ms-4 me-4">
        <h4 className="h4">Performance Reviews</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0 mt-4 ms-4 me-4 rating-details-table">
        {parse(reviewPage.description)}
      </CCardBody>
    </>
  )
}

export default EmployeeRatingDetails
