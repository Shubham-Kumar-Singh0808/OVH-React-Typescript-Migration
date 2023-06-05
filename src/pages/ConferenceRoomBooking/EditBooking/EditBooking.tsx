import React from 'react'
import EditBookingFilterOptions from './EditBookingFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const EditBooking = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Meeting Request Edit"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <EditBookingFilterOptions />
      </OCard>
    </>
  )
}

export default EditBooking
