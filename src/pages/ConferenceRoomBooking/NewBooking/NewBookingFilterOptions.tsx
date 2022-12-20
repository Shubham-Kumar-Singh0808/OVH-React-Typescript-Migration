import React, { useEffect, useState } from 'react'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import moment from 'moment'
import LocationAndRoom from './NewBookingChildComponents/LocationAndRoom'
import NewRoomReservedBy from './NewBookingChildComponents/NewRoomReservedBy'
import ProjectMembersSelection from './NewBookingChildComponents/ProjectMembersSelection'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { AddRoom } from '../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import { Availability } from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import { Author } from '../../../types/Dashboard/TrainingsAndEvents/trainingsAndEventsTypes'
import {
  Attendees,
  EventFromDate,
  SelectProject,
  StartTimeEndTime,
} from '../NewEvent/NewEventChildComponents'
import { showIsRequired } from '../../../utils/helper'
import OToast from '../../../components/ReusableComponent/OToast'

const NewBookingFilterOptions = (): JSX.Element => {
  const authorDetails = {} as Author
  const employeesAvailability = {} as Availability[]
  const initEvent = {
    agenda: '',
    authorName: authorDetails,
    availability: employeesAvailability,
    conferenceType: 'Meeting',
    employeeIds: [],
    endTime: '',
    fromDate: moment(new Date()).format('DD/MM/YYYY'),
    locationId: 1,
    projectName: '',
    roomId: 0,
    startTime: '',
  } as AddRoom
  const dispatch = useAppDispatch()

  const [isProjectAndAttendeesEnable, setIsProjectAndAttendeesEnable] =
    useState(true)
  const [newRoomBooking, setNewRoomBooking] = useState(initEvent)
  const [attendeesList, setAttendeesList] = useState<Availability[]>([])
  const [isAttendeeErrorShow, setIsAttendeeErrorShow] = useState(false)
  const [isErrorShow, setIsErrorShow] = useState(false)
  const [attendeesAutoCompleteTarget, setAttendeesAutoCompleteTarget] =
    useState<string>()
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
  }, [dispatch, location])

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
      fromDate: moment(value).format('DD/MM/YYYY'),
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
    const uniqueAttendanceResult = await dispatch(
      reduxServices.newEvent.uniqueAttendee(prepareObj),
    )
    if (
      reduxServices.newEvent.uniqueAttendee.rejected.match(
        uniqueAttendanceResult,
      ) &&
      uniqueAttendanceResult.payload === 409
    ) {
      const attendeeObj = {
        id: attendeeId,
        availability: 'buzy',
        name: attendeeName,
      }
      if (!checkIsAttendeeExists(attendeeId)) {
        setAttendeesList([attendeeObj, ...attendeesList])
        setIsErrorShow(false)
        setAttendeesAutoCompleteTarget('')
      } else {
        setIsErrorShow(true)
      }
    } else {
      const attendeeObj2 = {
        id: attendeeId,
        availability: 'free',
        name: attendeeName,
      }
      if (checkIsAttendeeExists(attendeeId)) {
        setIsErrorShow(true)
      } else {
        setAttendeesList([attendeeObj2, ...attendeesList])
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
      const addEventResult = await dispatch(
        reduxServices.newBooking.confirmNewMeetingAppointment(prepareObj),
      )
      if (
        reduxServices.newBooking.confirmNewMeetingAppointment.fulfilled.match(
          addEventResult,
        )
      ) {
        dispatch(
          reduxServices.app.actions.addToast(
            <OToast
              toastColor="success"
              toastMessage="Event Added Successfully"
            />,
          ),
        )
      }
    }
  }

  return (
    <>
      <LocationAndRoom
        onHandleLocation={onHandleLocation}
        onHandleRoom={onHandleRoom}
        locationValue={newRoomBooking.locationId}
        roomValue={newRoomBooking.roomId}
      />
      <NewRoomReservedBy
        loggedEmployeeName={loggedEmployee.fullName}
        allEmployeesProfiles={allEmployeesProfiles}
        onSelectAuthor={onSelectAuthor}
      />
      <EventFromDate
        fromDateValue={newRoomBooking.fromDate}
        fromDateChangeHandler={fromDateChangeHandler}
      />
      <StartTimeEndTime onSelectStartAndEndTime={onSelectStartAndEndTime} />
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Agenda:
          <span className={showIsRequired(newRoomBooking.agenda)}>*</span>
        </CFormLabel>
        <CCol sm={7}>
          <CFormTextarea
            placeholder="Purpose"
            data-testid="text-area"
            aria-label="textarea"
            value={newRoomBooking.agenda}
            onChange={(e) => {
              setNewRoomBooking({ ...newRoomBooking, agenda: e.target.value })
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
        attendeesAutoCompleteTarget={attendeesAutoCompleteTarget as string}
        setAttendeesAutoCompleteTarget={setAttendeesAutoCompleteTarget}
      />
      {projectMembers?.length > 0 && (
        <ProjectMembersSelection
          newRoomBooking={newRoomBooking}
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
            >
              Confirm
            </CButton>
            <CButton
              color="warning "
              data-testid="clearBtn"
              className="btn-ovh"
            >
              Clear
            </CButton>
          </>
        </CCol>
      </CRow>
    </>
  )
}

export default NewBookingFilterOptions
