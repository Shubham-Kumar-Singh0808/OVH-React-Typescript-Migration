import {
  CCol,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { Availability } from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const SelectedAttendees = ({
  attendeesList,
}: {
  attendeesList: Availability[]
}): JSX.Element => {
  return (
    <CCol sm={3}>
      <CTable>
        <CTableHead>
          <CTableHeaderCell>Attendees</CTableHeaderCell>
          <CTableHeaderCell>Availability</CTableHeaderCell>
          <CTableHeaderCell>Action</CTableHeaderCell>
        </CTableHead>
        <CTableBody>
          {attendeesList?.length > 0 &&
            attendeesList.map((currAttendee, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{currAttendee.name}</CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </CCol>
  )
}

export default SelectedAttendees
