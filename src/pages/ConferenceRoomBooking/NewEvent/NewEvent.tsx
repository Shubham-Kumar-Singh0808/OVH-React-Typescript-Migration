import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import {
  Attendees,
  EventEndDate,
  EventFromDate,
  EventType,
  LocationAndRoom,
  ReservedBy,
  SelectProject,
  StartTimeEndTime,
  Trainer,
} from './NewEventChildComponents'
import ProjectMembersSelection from './NewEventChildComponents/ProjectMembersSelection'
import SlotsBooked from './NewEventChildComponents/SlotsBooked'
import OCard from '../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  AddEvent,
  Author,
  Availability,
  TrainerDetails,
} from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import { showIsRequired } from '../../../utils/helper'
import OToast from '../../../components/ReusableComponent/OToast'

const NewEvent = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const eventLocations = useTypedSelector(
    reduxServices.addLocationList.selectors.locationNames,
  )

  const locationRooms = useTypedSelector(
    reduxServices.newEvent.selectors.roomsByLocation,
  )

  const loggedEmployee = useTypedSelector(
    reduxServices.newEvent.selectors.loggedEmployee,
  )

  const allEmployeesProfiles = useTypedSelector(
    reduxServices.newEvent.selectors.allEmployeesProfiles,
  )

  const eventTypeList = useTypedSelector(
    reduxServices.eventTypeList.selectors.eventTypeList,
  )

  const allProjects = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )

  const projectMembers = useTypedSelector(
    reduxServices.newEvent.selectors.projectMembers,
  )

  const trainerDetails = {} as TrainerDetails
  // const authorDetails = {} as Author
  const employeesAvailability = {} as Availability[]

  const initEvent = {
    agenda: '',
    authorName: loggedEmployee,
    availability: employeesAvailability,
    conferenceType: '',
    description: '',
    endTime: '',
    eventLocation: '',
    eventTypeId: 0,
    fromDate: moment(new Date()).format('DD/MM/YYYY'),
    locationId: 1,
    projectName: '',
    roomId: 0,
    startTime: '',
    toDate: '',
    trainerName: trainerDetails,
  } as AddEvent

  const [addEvent, setAddEvent] = useState(initEvent)
  const [descriptionValue, setDescriptionValue] = useState('')
  const [isProjectAndAttendeesEnable, setIsProjectAndAttendeesEnable] =
    useState(true)
  const [attendeesList, setAttendeesList] = useState<Availability[]>([])
  const [isErrorShow, setIsErrorShow] = useState(false)
  const [isAttendeeErrorShow, setIsAttendeeErrorShow] = useState(false)
  const [attendeesAutoCompleteTarget, setAttendeesAutoCompleteTarget] =
    useState<string>()

  useEffect(() => {
    dispatch(reduxServices.eventTypeList.getEventTypes())
    dispatch(reduxServices.addLocationList.getAllMeetingLocationsData())
    dispatch(reduxServices.newEvent.getLoggedEmployee())
    dispatch(reduxServices.eventTypeList.getEventTypes())
  }, [dispatch])

  useEffect(() => {
    if (addEvent.locationId)
      dispatch(reduxServices.newEvent.getRoomsByLocation(addEvent.locationId))
  }, [addEvent.locationId])

  useEffect(() => {
    if (addEvent.startTime === '' && addEvent.endTime === '') {
      setIsProjectAndAttendeesEnable(true)
    } else {
      setIsProjectAndAttendeesEnable(false)
    }
  }, [addEvent.startTime, addEvent.endTime])

  useEffect(() => {
    if (addEvent.projectName)
      dispatch(reduxServices.newEvent.getProjectMembers(addEvent.projectName))
  }, [addEvent.projectName])

  useEffect(() => {
    if ((addEvent.roomId, addEvent.toDate)) {
      dispatch(
        reduxServices.newEvent.getAllBookedDetailsForEvent({
          fromDate: addEvent.fromDate,
          roomId: addEvent.roomId,
          toDate: addEvent.toDate,
        }),
      )
    }
  }, [addEvent.roomId, addEvent.toDate])

  const checkIsAttendeeExists = (attendeeId: number) => {
    return attendeesList.some((attendee) => {
      return attendee.id === attendeeId
    })
  }

  const selectProjectMember = async (
    attendeeId: number,
    attendeeName: string,
  ) => {
    const newStartTime = addEvent.startTime.split(':')
    const newEndTime = addEvent.endTime.split(':')
    const prepareObj = {
      attendeeId,
      attendeeName,
      startTime: `${addEvent.fromDate}/${newStartTime[0]}/${newStartTime[1]}`,
      endTime: `${addEvent.fromDate}/${newEndTime[0]}/${newEndTime[1]}`,
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
  // console.log(attendeesList)

  // onchange handlers
  const onHandleLocation = (value: string) => {
    setAddEvent({ ...addEvent, locationId: Number(value) })
  }
  const onHandleRoom = (value: string) => {
    setAddEvent({ ...addEvent, roomId: Number(value) })
  }
  const onSelectAuthor = (value: Author) => {
    setAddEvent({ ...addEvent, authorName: value })
  }
  const onSelectTrainer = (value: Author) => {
    setAddEvent({ ...addEvent, trainerName: value })
  }
  const onHandleEventType = (value: string) => {
    setAddEvent({ ...addEvent, eventTypeId: Number(value) })
  }
  const fromDateChangeHandler = (value: Date) => {
    setAddEvent({
      ...addEvent,
      fromDate: moment(value).format('DD/MM/YYYY'),
    })
  }
  const toDateChangeHandler = (value: Date) => {
    setAddEvent({
      ...addEvent,
      toDate: moment(value).format('DD/MM/yyyy'),
    })
  }
  const onSelectStartAndEndTime = (val1: string, val2: string) => {
    setAddEvent({ ...addEvent, startTime: val1, endTime: val2 })
  }
  const onHandleDescription = (value: string) => {
    setDescriptionValue(value)
  }
  const onSelectProject = (value: string) => {
    setAddEvent({ ...addEvent, projectName: value })
  }

  const onSelectAttendee = (attendeeId: number, attendeeName: string) => {
    selectProjectMember(attendeeId, attendeeName)
    if (checkIsAttendeeExists(attendeeId)) {
      setIsAttendeeErrorShow(true)
    } else {
      setIsAttendeeErrorShow(false)
    }
  }

  const handleConfirmBtn = async () => {
    const startTimeSplit = addEvent.startTime.split(':')
    const endTimeSplit = addEvent.endTime.split(':')
    const timeCheckResult = await dispatch(
      reduxServices.newEvent.timeCheck(
        `${addEvent.fromDate}/${startTimeSplit[0]}/${startTimeSplit[1]}`,
      ),
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newAttendeesList = attendeesList.map(({ name, ...rest }) => {
      console.log(name)
      return rest
    })
    const prepareObj = {
      ...addEvent,
      conferenceType: 'Event',
      authorName: loggedEmployee,
      availability: newAttendeesList,
      description: descriptionValue,
      startTime: `${addEvent.fromDate}/${startTimeSplit[0]}/${startTimeSplit[1]}`,
      endTime: `${addEvent.fromDate}/${endTimeSplit[0]}/${endTimeSplit[1]}`,
    }
    if (timeCheckResult.payload === false) {
      const addEventResult = await dispatch(
        reduxServices.newEvent.addNewEvent(prepareObj),
      )
      if (reduxServices.newEvent.addNewEvent.fulfilled.match(addEventResult)) {
        history.push('/eventList')
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
    <OCard
      className="mb-4 myprofile-wrapper"
      title="New Event"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow>
        <CCol sm={8}>
          <CForm className="ms-4">
            <LocationAndRoom
              eventLocations={eventLocations}
              onHandleLocation={onHandleLocation}
              onHandleRoom={onHandleRoom}
              locationRooms={locationRooms}
              locationValue={addEvent.locationId}
              roomValue={addEvent.roomId}
            />
            <ReservedBy
              loggedEmployeeName={loggedEmployee.fullName}
              allEmployeesProfiles={allEmployeesProfiles}
              onSelectAuthor={onSelectAuthor}
            />
            <Trainer
              allEmployeesProfiles={allEmployeesProfiles}
              onSelectTrainer={onSelectTrainer}
            />
            <EventType
              eventTypeList={eventTypeList}
              eventTypeValue={addEvent.eventTypeId}
              onHandleEventType={onHandleEventType}
            />
            <EventFromDate
              fromDateValue={addEvent.fromDate}
              fromDateChangeHandler={fromDateChangeHandler}
            />
            <EventEndDate
              toDateValue={addEvent.toDate}
              toDateChangeHandler={toDateChangeHandler}
            />
            <StartTimeEndTime
              onSelectStartAndEndTime={onSelectStartAndEndTime}
            />
            <CRow className="mt-1 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Subject:
                <span className={showIsRequired(addEvent.agenda)}>*</span>
              </CFormLabel>
              <CCol sm={7}>
                <CFormTextarea
                  placeholder="Purpose"
                  data-testid="text-area"
                  aria-label="textarea"
                  value={addEvent.agenda}
                  onChange={(e) => {
                    setAddEvent({ ...addEvent, agenda: e.target.value })
                  }}
                ></CFormTextarea>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Description:
                <span className={showIsRequired(descriptionValue)}>*</span>
              </CFormLabel>
              <CCol sm={8}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={''}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onHandleDescription(editor.getData().trim())
                  }}
                />
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
                addEvent={addEvent}
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
          </CForm>
        </CCol>
        {addEvent.roomId && addEvent.toDate ? (
          <CCol sm={4}>
            <SlotsBooked />
          </CCol>
        ) : (
          <></>
        )}
      </CRow>
    </OCard>
  )
}
export default NewEvent
