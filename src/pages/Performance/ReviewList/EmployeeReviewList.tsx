import React from 'react'
import ReviewListTable from './ReviewListTable'
import ReviewListFilterOptions from './ReviewListFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const EmployeeReviewList = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Review List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ReviewListFilterOptions />
        <ReviewListTable />
      </OCard>
    </>
  )
}

export default EmployeeReviewList
