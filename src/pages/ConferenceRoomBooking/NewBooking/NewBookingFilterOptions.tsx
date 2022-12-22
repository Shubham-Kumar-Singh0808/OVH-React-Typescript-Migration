import React, { useEffect, useState } from 'react'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormTextarea,
  CButton,
  CForm,
} from '@coreui/react-pro'
import moment from 'moment'
import NewBookingLocation from './NewBookingChildComponents/NewBookingLocation'
import NewBookingRoom from './NewBookingChildComponents/NewBookingRoom'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { AddRoom } from '../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import { Availability } from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import { Author } from '../../../types/Dashboard/TrainingsAndEvents/trainingsAndEventsTypes'
import {
  Attendees,
  EventFromDate,
  ReservedBy,
  SelectProject,
  StartTimeEndTime,
} from '../NewEvent/NewEventChildComponents'
import { showIsRequired } from '../../../utils/helper'
import OToast from '../../../components/ReusableComponent/OToast'
import ProjectMembersSelection from '../NewEvent/NewEventChildComponents/ProjectMembersSelection'

const NewBookingFilterOptions = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const authorDetails = {} as Author
  const employeesAvailability = {} as Availability[]
  const dateFormat = 'DD/MM/YYYY'
  const initNewBooking = {
    agenda: '',
    authorName: authorDetails,
    availability: employeesAvailability,
    conferenceType: 'Meeting',
    employeeIds: [],
    endTime: '',
    fromDate: moment(new Date()).format(dateFormat),
    locationId: 1,
    projectName: '',
    roomId: 0,
    startTime: '',
  } as AddRoom
  const dispatch = useAppDispatch()

  const [isProjectAndAttendeesEnable, setIsProjectAndAttendeesEnable] =
    useState(true)
  const [newRoomBooking, setNewRoomBooking] = useState(initNewBooking)
  const [attendeesList, setAttendeesList] = useState<Availability[]>([])
  const [isAttendeeErrorShow, setIsAttendeeErrorShow] = useState(false)
  const [isErrorShow, setIsErrorShow] = useState(false)
  const [attendeesAutoCompleteTarget, setAttendeesAutoCompleteTarget] =
    useState<string>()
  const [isConfirmButtonEnabled, setIsConfirmButtonEnabled] = useState(false)
  const loggedEmployee = useTypedSelector(
    reduxServices.newEvent.selectors.loggedEmployee,
  )
  const allEmployeesProfiles = useTypedSelector(
    reduxServices.newEvent.selectors.allEmployeesProfiles,
  )

  const allProjects = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )

  const projectMembers = useTypedSelector(
    reduxServices.newEvent.selectors.projectMembers,
  )
  useEffect(() => {
    if (newRoomBooking.startTime === '' && newRoomBooking.endTime === '') {
      setIsProjectAndAttendeesEnable(true)
    } else {
      setIsProjectAndAttendeesEnable(false)
    }
  }, [newRoomBooking.startTime, newRoomBooking.endTime])

  useEffect(() => {
    dispatch(reduxServices.bookingList.getAllMeetingLocations())
    if (newRoomBooking.locationId) {
      dispatch(
        reduxServices.bookingList.getRoomsOfLocation(
          Number(newRoomBooking.locationId),
        ),
      )
    }
  }, [dispatch, newRoomBooking])

  useEffect(() => {
    dispatch(reduxServices.newEvent.getLoggedEmployee())
  }, [dispatch])

  useEffect(() => {
    if (newRoomBooking.projectName)
      dispatch(
        reduxServices.newEvent.getProjectMembers(newRoomBooking.projectName),
      )
  }, [newRoomBooking.projectName])

  const onHandleLocation = (value: string) => {
    setNewRoomBooking({ ...newRoomBooking, locationId: Number(value) })
  }
  const onHandleRoom = (value: string) => {
    setNewRoomBooking({ ...newRoomBooking, roomId: Number(value) })
  }
  const onSelectAuthor = (value: Author) => {
    setNewRoomBooking({ ...newRoomBooking, authorName: value })
  }
  const onSelectStartAndEndTime = (val1: string, val2: string) => {
    setNewRoomBooking({ ...newRoomBooking, startTime: val1, endTime: val2 })
  }

  const onSelectProject = (value: string) => {
    setNewRoomBooking({ ...newRoomBooking, projectName: value })
  }

  const checkIsAttendeeExists = (attendeeId: number) => {
    return attendeesList.some((attendee) => {
      return attendee.id === attendeeId
    })
  }
  const onSelectAttendee = (attendeeId: number, attendeeName: string) => {
    selectProjectMember(attendeeId, attendeeName)
    if (checkIsAttendeeExists(attendeeId)) {
      setIsAttendeeErrorShow(true)
    } else {
      setIsAttendeeErrorShow(false)
    }
  }

  const fromDateChangeHandler = (value: Date) => {
    setNewRoomBooking({
      ...newRoomBooking,
      fromDate: moment(value).format(dateFormat),
    })
  }

  const selectProjectMember = async (
    attendeeId: number,
    attendeeName: string,
  ) => {
    const newStartTime = newRoomBooking.startTime.split(':')
    const newEndTime = newRoomBooking.endTime.split(':')
    const prepareObj = {
      attendeeId,
      attendeeName,
      startTime: `${newRoomBooking.fromDate}/${newStartTime[0]}/${newStartTime[1]}`,
      endTime: `${newRoomBooking.fromDate}/${newEndTime[0]}/${newEndTime[1]}`,
    }
    const attendanceResult = await dispatch(
      reduxServices.newEvent.uniqueAttendee(prepareObj),
    )
    if (
      reduxServices.newEvent.uniqueAttendee.rejected.match(attendanceResult) &&
      attendanceResult.payload === 409
    ) {
      const attendeesObj = {
        id: attendeeId,
        availability: 'buzy',
        name: attendeeName,
      }
      if (!checkIsAttendeeExists(attendeeId)) {
        setAttendeesList([attendeesObj, ...attendeesList])
        setIsErrorShow(false)
        setAttendeesAutoCompleteTarget('')
      } else {
        setIsErrorShow(true)
      }
    } else {
      const attendeesObj2 = {
        id: attendeeId,
        availability: 'free',
        name: attendeeName,
      }
      if (checkIsAttendeeExists(attendeeId)) {
        setIsErrorShow(true)
      } else {
        setAttendeesList([attendeesObj2, ...attendeesList])
        setIsErrorShow(false)
        setAttendeesAutoCompleteTarget('')
      }
    }
  }

  const handleConfirmBtn = async () => {
    const startTimeSplit = newRoomBooking.startTime.split(':')
    const endTimeSplit = newRoomBooking.endTime.split(':')
    const timeCheckResult = await dispatch(
      reduxServices.newEvent.timeCheck(
        `${newRoomBooking.fromDate}/${startTimeSplit[0]}/${startTimeSplit[1]}`,
      ),
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newAttendeesList = attendeesList.map(({ name, ...rest }) => {
      console.log(name)
      return rest
    })
    const prepareObj = {
      ...newRoomBooking,
      conferenceType: 'Meeting',
      authorName: loggedEmployee,
      availability: newAttendeesList,
      startTime: `${newRoomBooking.fromDate}/${startTimeSplit[0]}/${startTimeSplit[1]}`,
      endTime: `${newRoomBooking.fromDate}/${endTimeSplit[0]}/${endTimeSplit[1]}`,
    }
    if (timeCheckResult.payload === false) {
      const addBookingResult = await dispatch(
        reduxServices.newBooking.confirmNewMeetingAppointment(prepareObj),
      )
      if (
        reduxServices.newBooking.confirmNewMeetingAppointment.fulfilled.match(
          addBookingResult,
        )
      ) {
        dispatch(
          reduxServices.app.actions.addToast(
            <OToast
              toastColor="success"
              toastMessage="Room Booked Successfully"
            />,
          ),
        )
        setNewRoomBooking({
          agenda: '',
          authorName: authorDetails,
          availability: employeesAvailability,
          conferenceType: 'Meeting',
          employeeIds: [],
          endTime: '',
          fromDate: moment(new Date()).format(dateFormat),
          locationId: 1,
          projectName: '',
          roomId: 0,
          startTime: '',
        })
      } else if (
        reduxServices.newBooking.confirmNewMeetingAppointment.rejected.match(
          addBookingResult,
        ) &&
        addBookingResult.payload === 409
      ) {
        dispatch(
          reduxServices.app.actions.addToast(
            <OToast
              toastColor="danger"
              toastMessage="            
              Sorry, you are late this room is already reserved..!"
            />,
          ),
        )
      }
    }
  }

  const ClearButtonHandler = () => {
    setNewRoomBooking({
      agenda: '',
      authorName: authorDetails,
      availability: employeesAvailability,
      conferenceType: 'Meeting',
      employeeIds: [],
      endTime: '',
      fromDate: moment(new Date()).format(dateFormat),
      locationId: 1,
      projectName: '',
      roomId: 0,
      startTime: '',
    })
  }

  useEffect(() => {
    if (
      newRoomBooking?.roomId &&
      newRoomBooking?.startTime &&
      newRoomBooking?.endTime &&
      newRoomBooking?.agenda?.replace(/^\s*/, '')
    ) {
      setIsConfirmButtonEnabled(true)
    } else {
      setIsConfirmButtonEnabled(false)
    }
  }, [newRoomBooking])

  return (
    <>
      <CRow>
        <CCol sm={8}>
          <CForm className="ms-4">
            <CRow className="mt-1 mb-3">
              <NewBookingLocation
                onHandleLocation={onHandleLocation}
                locationValue={newRoomBooking.locationId}
              />
              <CCol className="col-sm-3">
                <CButton
                  color="info btn-ovh me-1"
                  data-testid="locationAdd-btn"
                  onClick={() => setToggle('addLocation')}
                >
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-3">
              <NewBookingRoom
                onHandleRoom={onHandleRoom}
                roomValue={newRoomBooking.roomId}
              />
              <CCol className="col-sm-3">
                <CButton
                  color="info btn-ovh me-1"
                  onClick={() => setToggle('addRoom')}
                  data-testid="roomAdd-btn"
                >
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              </CCol>
            </CRow>
            <ReservedBy
              loggedEmployeeName={loggedEmployee.fullName}
              allEmployeesProfiles={allEmployeesProfiles}
              onSelectAuthor={onSelectAuthor}
            />
            <EventFromDate
              fromDateValue={newRoomBooking.fromDate}
              fromDateChangeHandler={fromDateChangeHandler}
            />
            <StartTimeEndTime
              onSelectStartAndEndTime={onSelectStartAndEndTime}
            />
            <CRow className="mt-1 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Agenda:
                <span
                  className={showIsRequired(
                    newRoomBooking.agenda.replace(/^\s*/, ''),
                  )}
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={6}>
                <CFormTextarea
                  placeholder="Purpose"
                  data-testid="text-area"
                  aria-label="textarea"
                  value={newRoomBooking.agenda}
                  onChange={(e) => {
                    setNewRoomBooking({
                      ...newRoomBooking,
                      agenda: e.target.value,
                    })
                  }}
                ></CFormTextarea>
              </CCol>
            </CRow>
            <SelectProject
              allProjects={allProjects}
              onSelectProject={onSelectProject}
              isProjectAndAttendeesEnable={isProjectAndAttendeesEnable}
            />
            <Attendees
              allEmployeesProfiles={allEmployeesProfiles}
              isProjectAndAttendeesEnable={isProjectAndAttendeesEnable}
              onSelectAttendee={onSelectAttendee}
              isErrorShow={isErrorShow}
              isAttendeeErrorShow={isAttendeeErrorShow}
              setIsAttendeeErrorShow={setIsAttendeeErrorShow}
              setIsErrorShow={setIsErrorShow}
              attendeesAutoCompleteTarget={
                attendeesAutoCompleteTarget as string
              }
              setAttendeesAutoCompleteTarget={setAttendeesAutoCompleteTarget}
            />
            {projectMembers?.length > 0 && (
              <ProjectMembersSelection
                addEvent={newRoomBooking}
                projectMembers={projectMembers}
                attendeesList={attendeesList}
                setAttendeesList={setAttendeesList}
                selectProjectMember={selectProjectMember}
                isErrorShow={isErrorShow}
                setIsErrorShow={setIsErrorShow}
                setIsAttendeeErrorShow={setIsAttendeeErrorShow}
                checkIsAttendeeExists={checkIsAttendeeExists}
              />
            )}
            <CRow className="mt-5 mb-4">
              <CCol md={{ span: 6, offset: 3 }}>
                <>
                  <CButton
                    className="btn-ovh me-1"
                    data-testid="confirmBtn"
                    color="success"
                    onClick={handleConfirmBtn}
                    disabled={!isConfirmButtonEnabled}
                  >
                    Confirm
                  </CButton>
                  <CButton
                    color="warning "
                    data-testid="clearBtn"
                    className="btn-ovh"
                    onClick={ClearButtonHandler}
                  >
                    Clear
                  </CButton>
                </>
              </CCol>
            </CRow>
          </CForm>
        </CCol>
      </CRow>
    </>
  )
}

export default NewBookingFilterOptions
