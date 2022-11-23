import {
  CCol,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CButton,
} from '@coreui/react-pro'
import React from 'react'
import { Availability } from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const SelectedAttendees = ({
  attendeesList,
  deleteBtnHandler,
}: {
  attendeesList: Availability[]
  deleteBtnHandler: (value: number) => void
}): JSX.Element => {
  return (
    <CCol sm={5} className="fixed-height">
      <CTable responsive striped className="align-middle">
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
                  <CTableDataCell>
                    {currAttendee.availability === 'free' ? (
                      <span className="sh-span-green">Available</span>
                    ) : (
                      <span className="sh-span-red">Not Available</span>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="danger btn-ovh me-1"
                      className="btn-ovh-employee-list"
                      onClick={() => deleteBtnHandler(currAttendee.id)}
                    >
                      <i
                        className="fa fa-trash-o text-white"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </CCol>
  )
}

export default SelectedAttendees
