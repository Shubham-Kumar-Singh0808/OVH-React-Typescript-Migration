import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import SelectedAttendeesForEvent from './SelectedAttendeesForEvent'
import {
  AddEvent,
  Availability,
  ProjectMember,
} from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import { MeetingEditDTOList } from '../../../../types/ConferenceRoomBooking/EventList/eventListTypes'

const ProjectMembersSelectionForEvent = ({
  editEvent,
  projectMembers,
  attendeeResponse,
  setAttendeesResponse,
  selectProjectMember,
  isErrorShow,
  setIsAttendeeErrorShow,
  checkIsAttendeeExists,
  setIsErrorShow,
  deleteAttendeeId,
}: {
  editEvent: AddEvent
  projectMembers: ProjectMember[]
  attendeeResponse: MeetingEditDTOList[]
  setAttendeesResponse: (value: MeetingEditDTOList[]) => void
  selectProjectMember: (
    attendeeId: number,
    attendeeName: string,
    meetingRequestId: number,
  ) => void
  isErrorShow: boolean
  setIsAttendeeErrorShow: (value: boolean) => void
  checkIsAttendeeExists: (attendeeId: number) => boolean
  setIsErrorShow: React.Dispatch<React.SetStateAction<boolean>>
  deleteAttendeeId: number | undefined
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [deleteAttendeeModalVisible, setDeleteAttendeeModalVisible] =
    useState(false)
  const [deleteListModalVisible, setDeleteListModalVisible] = useState(false)
  // const [deleteAttendeeId, setDeleteAttendeeId] = useState<number>()
  const [addListModalVisible, setAddListModalVisible] = useState(false)

  const deleteAttendeeSuccessToast = (
    <OToast toastColor="success" toastMessage="Attendee Deleted Successfully" />
  )

  const deleteAllAttendeesToast = (
    <OToast
      toastColor="success"
      toastMessage="Attendees Deleted Successfully"
    />
  )

  // const handleConfirmDeleteAttendee = () => {
  //   const newList = attendeesList.filter(
  //     (attendee) => attendee.id !== (deleteAttendeeId as number),
  //   )
  //   setAttendeesList([...newList])
  //   setDeleteAttendeeModalVisible(false)
  //   dispatch(reduxServices.app.actions.addToast(deleteAttendeeSuccessToast))
  //   dispatch(reduxServices.app.actions.addToast(undefined))
  // }
  const handleConfirmDeleteAttendee = () => {
    const newList = attendeeResponse.filter(
      (attendee) => attendee.id !== (deleteAttendeeId as number),
    )
    setAttendeesResponse([...newList])
    setDeleteAttendeeModalVisible(false)
    dispatch(reduxServices.app.actions.addToast(deleteAttendeeSuccessToast))
    dispatch(reduxServices.app.actions.addToast(undefined))
  }

  const confirmDeleteAllAttendees = () => {
    setDeleteListModalVisible(false)
    setAttendeesResponse([])
    dispatch(reduxServices.app.actions.addToast(deleteAllAttendeesToast))
    dispatch(reduxServices.app.actions.addToast(undefined))
  }

  const newMember: MeetingEditDTOList[] = []
  const confirmAddAllAttendees = async () => {
    setAddListModalVisible(false)
    setIsErrorShow(false)
    const newResult = await Promise.all(
      projectMembers.map(async (member) => {
        const startTimeCopy = editEvent?.startTime.split(':')
        const endTimeCopy = editEvent?.endTime.split(':')
        const prepareObj = {
          attendeeId: member.candidateId,
          attendeeName: member.fullName,
          meetingRequestId: member.id,
          startTime: `${editEvent.fromDate}/${startTimeCopy[0]}/${startTimeCopy[1]}`,
          endTime: `${editEvent.fromDate}/${endTimeCopy[0]}/${endTimeCopy[1]}`,
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
    setAttendeesResponse([...filteredMembers, ...attendeeResponse])
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
      <CRow className="mt-4 ms-5">
        <CCol sm={12}>
          <CRow>
            <CCol sm={5} md={4}>
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
                                selectProjectMember(
                                  currMember.id,
                                  currMember.fullName,
                                  currMember.candidateId,
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
              {isErrorShow && (
                <CRow>
                  <CCol>
                    <span className="sh-span-red">
                      The employee already added to Attendees
                    </span>
                  </CCol>
                </CRow>
              )}
            </CCol>

            <CCol sm={2} md={3} className="meeting-bulk-add">
              <CButton
                color="info btn-ovh me-1"
                className="btn-ovh"
                data-testid="delete-btn"
                onClick={() => setAddListModalVisible(true)}
              >
                <i
                  className="fa fa-arrow-right text-white"
                  aria-hidden="true"
                ></i>
              </CButton>
              {attendeeResponse?.length > 0 && (
                <CButton
                  color="danger btn-ovh me-1"
                  className="btn-ovh"
                  data-testid="delete-button"
                  onClick={() => setDeleteListModalVisible(true)}
                >
                  <i
                    className="fa fa-trash-o text-white"
                    aria-hidden="true"
                  ></i>
                </CButton>
              )}
            </CCol>
          </CRow>
        </CCol>
      </CRow>
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
      <OModal
        alignment="center"
        modalTitle="Delete All Attendees"
        visible={deleteListModalVisible}
        setVisible={setDeleteListModalVisible}
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalBodyClass="mt-0"
        confirmButtonAction={confirmDeleteAllAttendees}
      >
        <span>Do you really want to delete all Attendees ?</span>
      </OModal>
      <OModal
        alignment="center"
        modalTitle="Add All Attendees"
        visible={addListModalVisible}
        setVisible={setAddListModalVisible}
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalBodyClass="mt-0"
        confirmButtonAction={confirmAddAllAttendees}
      >
        <span>Do you really want to add all Attendees ?</span>
      </OModal>
    </>
  )
}

export default ProjectMembersSelectionForEvent
