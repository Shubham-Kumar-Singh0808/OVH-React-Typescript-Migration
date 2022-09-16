import React from 'react'
import BookingListFilterOptions from './BookingListFilterOptions'
import BookingListTable from './BookingListTable'
import OCard from '../../../components/ReusableComponent/OCard'

const BookingList = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Ticket Approvals'}
        CFooterClassName="d-none"
      >
        <BookingListFilterOptions />
        <BookingListTable />
      </OCard>
    </>
  )
}

export default BookingList
