import React from 'react'
import BookingListFilterOptions from './BookingListFilterOptions'
import BookingListTable from './BookingListTable'

const BookingList = (): JSX.Element => {
  return (
    <>
      <BookingListFilterOptions />
      <BookingListTable />
    </>
  )
}

export default BookingList
