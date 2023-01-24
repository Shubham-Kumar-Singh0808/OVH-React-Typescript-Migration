import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import RoomAndLocation from './EditEventChildComponents/RoomAndLocation'
import ReservedBy from './EditEventChildComponents/ReservedBy'
import FromAndToDate from './EditEventChildComponents/FromAndToDate'
import EventTrainer from './EditEventChildComponents/EventTrainer'
import EventStartTimeEndTime from './EditEventChildComponents/EventStartTimeEndTime'
import SelectProject from './EditEventChildComponents/SelectProject'
import EventAttendees from './EditEventChildComponents/EventAttendees'
import ProjectMembersSelectionForEvent from './EditEventChildComponents/ProjectMembersSelectionForEvent'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  Author,
  MeetingEditDTOList,
  Trainer,
} from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'
import { Availability } from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import { showIsRequired } from '../../../utils/helper'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'

const EditEvent = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const editExistingEvent = useTypedSelector(
    reduxServices.eventList.selectors.editExistingEventData,
  )
  console.log(editExistingEvent)

  const locations = useTypedSelector(
    reduxServices.addLocationList.selectors.locationNames,
  )

  const rooms = useTypedSelector(
    reduxServices.newEvent.selectors.roomsByLocation,
  )
  const allProjects = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )
  const allEmployeesProfiles = useTypedSelector(
    reduxServices.newEvent.selectors.allEmployeesProfiles,
  )
  const projectMembers = useTypedSelector(
    reduxServices.newEvent.selectors.projectMembers,
  )
  const meetingEditDTOList = {} as MeetingEditDTOList[]
  const availability = {} as Availability[]
  const trainerDetails = {} as Trainer
  const dateFormat = 'DD/MM/YYYY'

  //   const initialEventData = {
  //     agenda: '',
  //     authorName: loggedEmployee,
  //     availability,
  //     availableDates: '',
  //     conferenceType: '',
  //     description: '',
  //     disableEdit: null,
  //     empDesignations: null,
  //     employeeAvailability: null,
  //     employeeDto: null,
  //     employeeIds: null,
  //     employeeNames: [],
  //     endTime: '',
  //     eventEditAccess: null,
  //     eventId: 0,
  //     eventLocation: '',
  //     eventTypeId: 0,
  //     eventTypeName: '',
  //     fromDate: '',
  //     id: 0,
  //     isAuthorisedUser: true,
  //     locationId: editExistingEvent.locationId,
  //     locationName: '',
  //     meetingAttendeesDto: null,
  //     meetingEditDTOList,
  //     meetingStatus: null,
  //     projectName: editExistingEvent.projectName,
  //     roomId: editExistingEvent.roomId,
  //     roomName: '',
  //     startTime: '',
  //     timeFomrat: null,
  //     toDate: '',
  //     trainerName: trainerDetails,
  //   }
  const [editEvent, setEditEvent] = useState(editExistingEvent)
  const [descriptionValue, setDescriptionValue] = useState('')
  const [isProjectAndAttendeesEnable, setIsProjectAndAttendeesEnable] =
    useState(true)
  const [attendeesList, setAttendeesList] = useState<Availability[]>([])
  const [isErrorShow, setIsErrorShow] = useState(false)
  const [attendeesAutoCompleteTarget, setAttendeesAutoCompleteTarget] =
    useState<string>()
  const [isAttendeeErrorShow, setIsAttendeeErrorShow] = useState(false)

  useEffect(() => {
    dispatch(reduxServices.addLocationList.getAllMeetingLocationsData())
    dispatch(reduxServices.newEvent.getLoggedEmployee())
    if (editEvent.roomId) {
      dispatch(
        reduxServices.newEvent.getRoomsByLocation(Number(editEvent.locationId)),
      )
    }
  }, [dispatch, editEvent])

  const onSelectTrainer = (value: Author) => {
    setEditEvent({ ...editEvent, trainerName: value })
  }
  const onHandleDescription = (value: string) => {
    setDescriptionValue(value)
  }

  const onSelectProject = (value: string) => {
    setEditEvent({ ...editEvent, projectName: value })
  }

  const checkIsAttendeeExists = (attendeeId: number) => {
    return attendeesList.some((attendee) => {
      return attendee.id === attendeeId
    })
  }

  const selectProjectMember = async (
    attendeeId: number,
    attendeeName: string,
  ) => {
    const newStartTime = editEvent.startTime.split(':')
    const newEndTime = editEvent.endTime.split(':')
    const prepareObj = {
      attendeeId,
      attendeeName,
      startTime: `${editEvent.fromDate}/${newStartTime[0]}/${newStartTime[1]}`,
      endTime: `${editEvent.fromDate}/${newEndTime[0]}/${newEndTime[1]}`,
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

  const onSelectAttendee = (attendeeId: number, attendeeName: string) => {
    selectProjectMember(attendeeId, attendeeName)
    if (checkIsAttendeeExists(attendeeId)) {
      setIsAttendeeErrorShow(true)
    } else {
      setIsAttendeeErrorShow(false)
    }
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Event Edit"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <Link to={`/eventList`}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-btn"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={8}>
          <CForm className="ms-4">
            <RoomAndLocation
              eventLocations={locations}
              locationRooms={rooms}
              locationValue={editEvent.locationId}
              roomValue={editEvent.roomId}
            />
            <ReservedBy eventReservedBy={editEvent?.authorName?.fullName} />
            <EventTrainer
              allEmployeesProfiles={allEmployeesProfiles}
              onSelectTrainer={onSelectTrainer}
            />
            <FromAndToDate
              fromDate={editExistingEvent.fromDate}
              endDate={editExistingEvent.toDate}
            />
            <EventStartTimeEndTime
              startTime={editExistingEvent.startTime}
              endTime={editExistingEvent.endTime}
            />
            <CRow className="mt-1 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Subject:
                <span className={showIsRequired(editEvent.agenda)}>*</span>
              </CFormLabel>
              <CCol sm={7}>
                <CFormTextarea
                  placeholder="Purpose"
                  data-testid="text-area"
                  aria-label="textarea"
                  value={editEvent.agenda}
                  onChange={(e) => {
                    setEditEvent({ ...editEvent, agenda: e.target.value })
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

            <EventAttendees
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
              <ProjectMembersSelectionForEvent
                editEvent={editEvent}
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
                    // onClick={handleConfirmBtn}
                  >
                    Update
                  </CButton>
                  <CButton
                    color="warning "
                    data-testid="clearBtn"
                    className="btn-ovh"
                  >
                    Cancel
                  </CButton>
                </>
              </CCol>
            </CRow>
          </CForm>
        </CCol>
        {/* {addEvent.roomId && addEvent.toDate ? (
          <CCol sm={4}>
            <SlotsBooked />
          </CCol>
        ) : (
          <></>
        )} */}
      </CRow>
    </OCard>
  )
}

export default EditEvent
