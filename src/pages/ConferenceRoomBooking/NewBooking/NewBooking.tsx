import React from 'react'
import NewBookingFilterOptions from './NewBookingFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const NewBooking = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Meeting Request"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <NewBookingFilterOptions />
      </OCard>
    </>
  )
}

export default NewBooking
