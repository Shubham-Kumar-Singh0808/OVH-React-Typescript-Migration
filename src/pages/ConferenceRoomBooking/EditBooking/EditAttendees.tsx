import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EditAttendees = (): JSX.Element => {
  const editExistingMeetingRequest = useTypedSelector(
    reduxServices.bookingList.selectors.editExistingMeetingRequest,
  )
  return (
    <>
      <CTable responsive striped className="align-middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Attendees</CTableHeaderCell>
            <CTableHeaderCell>Availability</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {editExistingMeetingRequest?.meetingEditDTOList?.map(
            (item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item?.fullName}</CTableDataCell>
                  <CTableDataCell>{item?.availability}</CTableDataCell>
                </CTableRow>
              )
            },
          )}
        </CTableBody>
      </CTable>
    </>
  )
}
export default EditAttendees
