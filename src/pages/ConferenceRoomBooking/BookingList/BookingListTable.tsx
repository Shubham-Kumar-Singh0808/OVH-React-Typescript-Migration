import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
} from '@coreui/react-pro'
import React from 'react'

const BookingListTable = (): JSX.Element => {
  return (
    <>
      <CTable responsive striped className="text-start mt-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Agenda</CTableHeaderCell>
            <CTableHeaderCell scope="col">Booked Timings</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Room</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Author</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
      </CTable>
    </>
  )
}

export default BookingListTable
