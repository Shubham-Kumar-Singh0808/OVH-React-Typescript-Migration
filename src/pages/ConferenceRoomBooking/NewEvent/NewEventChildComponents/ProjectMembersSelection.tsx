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
import SelectedAttendees from './SelectedAttendees'
import {
  AddEvent,
  Availability,
  ProjectMembers,
} from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'

const ProjectMembersSelection = ({
  projectMembers,
  addEvent,
}: {
  projectMembers: ProjectMembers[]
  addEvent: AddEvent
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [attendeesList, setAttendeesList] = useState<Availability[]>([])
  const [isErrorShow, setIsErrorShow] = useState(false)

  const selectError = useTypedSelector(
    reduxServices.newEvent.selectors.selectError,
  )

  const checkIsAttendeeExists = (attendeeId: number) => {
    return attendeesList.some((attendee) => {
      return attendee.id === attendeeId
    })
  }

  const selectProjectMember = (attendeeId: number, attendeeName: string) => {
    const newStartTime = addEvent.startTime.split(':')
    const newEndTime = addEvent.startTime.split(':')
    const prepareObj = {
      attendeeId,
      attendeeName,
      startTime: `${addEvent.fromDate}/${newStartTime[0]}/${newStartTime[1]}`,
      endTime: `${addEvent.fromDate}/${newEndTime[0]}/${newEndTime[1]}`,
    }
    dispatch(reduxServices.newEvent.uniqueAttendee(prepareObj))
    if (!selectError) {
      const attendeeObj = {
        id: attendeeId,
        availability: 'free',
        name: attendeeName,
      }
      if (checkIsAttendeeExists(attendeeId)) {
        setIsErrorShow(true)
      } else {
        setAttendeesList([attendeeObj, ...attendeesList])
        setIsErrorShow(false)
      }
    } else {
      const attendeeObj = {
        id: attendeeId,
        availability: 'not available',
        name: attendeeName,
      }
      if (checkIsAttendeeExists(attendeeId)) {
        setAttendeesList([attendeeObj, ...attendeesList])
      }
    }
  }

  const deleteBtnHandler = (id: number) => {
    const newList = attendeesList.filter((attendee) => attendee.id !== id)
    setAttendeesList([...newList])
  }
  console.log(attendeesList)

  return (
    <>
      <CRow className="mt-4 ms-5">
        <CCol sm={9}>
          <CRow>
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
                              onClick={() =>
                                selectProjectMember(
                                  currMember.id,
                                  currMember.fullName,
                                )
                              }
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

            <CCol sm={2} className="meeting-bulk-add">
              <CButton color="info btn-ovh me-1" className="btn-ovh">
                <i
                  className="fa fa-arrow-right text-white"
                  aria-hidden="true"
                ></i>
              </CButton>
              <CButton color="danger btn-ovh me-1" className="btn-ovh">
                <i className="fa fa-trash-o text-white" aria-hidden="true"></i>
              </CButton>
            </CCol>
            <SelectedAttendees
              attendeesList={attendeesList}
              deleteBtnHandler={deleteBtnHandler}
            />
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default ProjectMembersSelection
