import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCol,
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
      <CCol sm={5} md={4} className="fixed-height pe-0 ps-0">
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
                    <CTableDataCell>
                      {item?.availability === 'free' ? (
                        <span className="sh-span-green">Available</span>
                      ) : (
                        <span className="sh-span-red">Not Available</span>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger btn-ovh me-1"
                        className="btn-ovh-employee-list"
                        data-testid="delete-btn"
                        // onClick={() => deleteBtnHandler(item.id)}
                      >
                        <i
                          className="fa fa-trash-o text-white"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              },
            )}
          </CTableBody>
        </CTable>
      </CCol>
    </>
  )
}
export default EditAttendees
