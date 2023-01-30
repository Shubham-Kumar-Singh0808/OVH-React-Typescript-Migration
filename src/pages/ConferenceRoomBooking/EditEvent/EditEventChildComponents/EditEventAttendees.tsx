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
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import { MeetingEditDTOList } from '../../../../types/ConferenceRoomBooking/EventList/eventListTypes'

const EditEventAttendees = ({
  attendeeResponse,
  setAttendeesResponse,
  deleteAttendeeId,
  setDeleteAttendeeId,
}: {
  attendeeResponse: MeetingEditDTOList[]
  setAttendeesResponse: (value: MeetingEditDTOList[]) => void
  deleteAttendeeId: number | undefined
  setDeleteAttendeeId: React.Dispatch<React.SetStateAction<number | undefined>>
}): JSX.Element => {
  const [deleteAttendeeModalVisible, setDeleteAttendeeModalVisible] =
    useState(false)

  const deleteAttendeeSuccessToast = (
    <OToast toastColor="success" toastMessage="Attendee Deleted Successfully" />
  )

  const dispatch = useAppDispatch()
  const deleteButtonHandler = (id: number) => {
    setDeleteAttendeeId(id)
    setDeleteAttendeeModalVisible(true)
  }
  const handleDeleteAttendee = () => {
    const newList = attendeeResponse?.filter(
      (attendee) => attendee?.id !== (deleteAttendeeId as number),
    )
    setAttendeesResponse([...newList])
    setDeleteAttendeeModalVisible(false)
    dispatch(reduxServices.app.actions.addToast(deleteAttendeeSuccessToast))
    dispatch(reduxServices.app.actions.addToast(undefined))
  }
  return (
    <>
      <CCol md={6} className="fixed-height pe-0 ps-0">
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
                      onClick={() => deleteButtonHandler(item.id)}
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
        confirmButtonAction={handleDeleteAttendee}
      >
        <span>Do you really want to delete this Attendee ?</span>
      </OModal>
    </>
  )
}
export default EditEventAttendees
