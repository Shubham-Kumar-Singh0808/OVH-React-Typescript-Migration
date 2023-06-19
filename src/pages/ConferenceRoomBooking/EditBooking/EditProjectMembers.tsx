import {
  CButton,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import {
  EditMeetingRequest,
  MeetingEditDTOList,
} from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import { ProjectMember } from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const ProjectMembersSelection = ({
  editMeetingRequest,
  projectMembers,
  attendeeResponse,
  setAttendeeReport,
  selectEditProjectMember,
  setIsAttendeeErrorShow,
  checkIsAttendeeExists,
  setIsErrorShow,
  deleteAttendeeId,
}: {
  editMeetingRequest: EditMeetingRequest
  projectMembers: ProjectMember[]
  attendeeResponse: MeetingEditDTOList[]
  setAttendeeReport: (value: MeetingEditDTOList[]) => void
  selectEditProjectMember: (attendeeId: number, attendeeName: string) => void
  setIsAttendeeErrorShow: (value: boolean) => void
  checkIsAttendeeExists: (attendeeId: number) => boolean
  setIsErrorShow: React.Dispatch<React.SetStateAction<boolean>>
  deleteAttendeeId: number | undefined
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [deleteAttendeeModalVisible, setDeleteAttendeeModalVisible] =
    useState(false)
  const [deleteListModalVisible, setDeleteListModalVisible] = useState(false)
  const [updateListModalVisible, setUpdateListModalVisible] = useState(false)

  const deleteAttendeeSuccessToast = (
    <OToast toastColor="success" toastMessage="Attendee Deleted Successfully" />
  )

  const deleteAllAttendeesToast = (
    <OToast
      toastColor="success"
      toastMessage="Attendees Deleted Successfully"
    />
  )

  const handleConfirmDeleteAttendeeList = () => {
    const newList = attendeeResponse.filter(
      (attendee) => attendee.id !== (deleteAttendeeId as number),
    )
    setAttendeeReport([...newList])
    setDeleteAttendeeModalVisible(false)
    dispatch(reduxServices.app.actions.addToast(deleteAttendeeSuccessToast))
  }

  const confirmDeleteAllAttendeesList = () => {
    setDeleteListModalVisible(false)
    setAttendeeReport([])
    dispatch(reduxServices.app.actions.addToast(deleteAllAttendeesToast))
  }

  const newMember: MeetingEditDTOList[] = []
  const confirmAddAllAttendeesList = async () => {
    setUpdateListModalVisible(false)
    setIsErrorShow(false)
    const newResult = await Promise.all(
      projectMembers?.map(async (member) => {
        const startTimeCopy = editMeetingRequest?.startTime.split(':')
        const endTimeCopy = editMeetingRequest?.endTime.split(':')
        const prepareObj = {
          attendeeId: member.id,
          attendeeName: member.fullName,
          startTime: `${editMeetingRequest.fromDate}/${startTimeCopy[0]}/${startTimeCopy[1]}`,
          endTime: `${editMeetingRequest.fromDate}/${endTimeCopy[0]}/${endTimeCopy[1]}`,
        }
        const uniqueAttendanceResultAction = await dispatch(
          reduxServices.bookingList.editUniqueAttendee(prepareObj),
        )
        if (
          reduxServices.bookingList.editUniqueAttendee.rejected.match(
            uniqueAttendanceResultAction,
          ) &&
          uniqueAttendanceResultAction.payload === 409
        ) {
          if (!checkIsAttendeeExists(member.id)) {
            newMember.push({
              id: member.id,
              availability: 'buzy',
              fullName: member.fullName,
            })
          }
        } else if (!checkIsAttendeeExists(member.id)) {
          newMember?.push({
            id: member.id,
            availability: 'free',
            fullName: member.fullName,
          })
        }
        return newMember
      }),
    )

    const filteredMembers = Array.from(new Set(newResult))[0].filter(
      (obj1) => !attendeeResponse?.some((obj2) => obj1?.id === obj2?.id),
    )
    setAttendeeReport([...filteredMembers, ...attendeeResponse])
    dispatch(
      reduxServices.app.actions.addToast(
        <OToast
          toastColor="success"
          toastMessage="Attendees Added Successfully"
        />,
      ),
    )
    dispatch(reduxServices.app.actions.addToast(undefined))
  }

  return (
    <>
      <CCol sm={4}>
        <CTable responsive striped className="align-middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Project People</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {projectMembers &&
              projectMembers?.map((currMember, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{currMember.fullName}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info btn-ovh me-1"
                        className="btn-ovh-employee-list"
                        data-testid="project-member"
                        onClick={() => {
                          selectEditProjectMember(
                            currMember?.id,
                            currMember?.fullName,
                          )
                          setIsAttendeeErrorShow(false)
                        }}
                      >
                        <i
                          className="fa fa-arrow-right text-white"
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
      <CCol sm={2} className="meeting-bulk-add">
        <CButton
          color="info btn-ovh me-1"
          className="btn-ovh"
          data-testid="attendeeDelete-btn"
          onClick={() => setUpdateListModalVisible(true)}
        >
          <i className="fa fa-arrow-right text-white" aria-hidden="true"></i>
        </CButton>
        {attendeeResponse?.length > 0 && (
          <CTooltip content="Delete">
            <CButton
              color="danger btn-ovh me-1"
              className="btn-ovh"
              data-testid="delete-button"
              onClick={() => setDeleteListModalVisible(true)}
            >
              <i className="fa fa-trash-o text-white" aria-hidden="true"></i>
            </CButton>
          </CTooltip>
        )}
        <OModal
          alignment="center"
          modalTitle="Delete Attendee"
          visible={deleteAttendeeModalVisible}
          setVisible={setDeleteAttendeeModalVisible}
          closeButtonClass="d-none"
          confirmButtonText="Yes"
          cancelButtonText="No"
          modalBodyClass="mt-0"
          confirmButtonAction={handleConfirmDeleteAttendeeList}
        >
          <span>Do you really want to delete this Attendee ?</span>
        </OModal>
        <OModal
          alignment="center"
          modalTitle="Delete All Attendees"
          visible={deleteListModalVisible}
          setVisible={setDeleteListModalVisible}
          closeButtonClass="d-none"
          confirmButtonText="Yes"
          cancelButtonText="No"
          modalBodyClass="mt-0"
          confirmButtonAction={confirmDeleteAllAttendeesList}
        >
          <span>Do you really want to delete all Attendees ?</span>
        </OModal>
        <OModal
          alignment="center"
          modalTitle="Add All Attendees"
          visible={updateListModalVisible}
          setVisible={setUpdateListModalVisible}
          closeButtonClass="d-none"
          confirmButtonText="Yes"
          cancelButtonText="No"
          modalBodyClass="mt-0"
          confirmButtonAction={confirmAddAllAttendeesList}
        >
          <span>Do you really want to add all Attendees ?</span>
        </OModal>
      </CCol>
    </>
  )
}

export default ProjectMembersSelection
