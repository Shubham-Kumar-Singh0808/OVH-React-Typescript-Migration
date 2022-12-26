import React from 'react'
import MyReviewTabs from './MyReviewTabs'
import OCard from '../../../components/ReusableComponent/OCard'

const MyReview = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="My Review"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <MyReviewTabs />
      </OCard>
    </>
  )
}

export default MyReview
