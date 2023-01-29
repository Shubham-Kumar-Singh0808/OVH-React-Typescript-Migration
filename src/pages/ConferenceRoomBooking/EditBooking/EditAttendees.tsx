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
import React, { useState } from 'react'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import { MeetingEditDTOList } from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'

const EditAttendees = ({
  attendeeResponse,
  setAttendeeReport,
}: {
  attendeeResponse: MeetingEditDTOList[]
  setAttendeeReport: (value: MeetingEditDTOList[]) => void
}): JSX.Element => {
  const [deleteAttendeeId, setDeleteAttendeeId] = useState<number>()
  const [deleteAttendeeModalVisible, setDeleteAttendeeModalVisible] =
    useState(false)

  const deleteAttendeeSuccessToast = (
    <OToast toastColor="success" toastMessage="Attendee Deleted Successfully" />
  )

  const dispatch = useAppDispatch()
  const deleteBtnHandler = (id: number) => {
    setDeleteAttendeeId(id)
    setDeleteAttendeeModalVisible(true)
  }
  const handleConfirmDeleteAttendee = () => {
    const newList = attendeeResponse?.filter(
      (attendee) => attendee?.id !== (deleteAttendeeId as number),
    )
    setAttendeeReport([...newList])
    setDeleteAttendeeModalVisible(false)
    dispatch(reduxServices.app.actions.addToast(deleteAttendeeSuccessToast))
    dispatch(reduxServices.app.actions.addToast(undefined))
  }
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
            {attendeeResponse?.map((item, index) => {
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
                      onClick={() => deleteBtnHandler(item.id)}
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
      <OModal
        alignment="center"
        modalTitle="Delete Attendee"
        visible={deleteAttendeeModalVisible}
        setVisible={setDeleteAttendeeModalVisible}
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalBodyClass="mt-0"
        confirmButtonAction={handleConfirmDeleteAttendee}
      >
        <span>Do you really want to delete this Attendee ?</span>
      </OModal>
    </>
  )
}
export default EditAttendees
