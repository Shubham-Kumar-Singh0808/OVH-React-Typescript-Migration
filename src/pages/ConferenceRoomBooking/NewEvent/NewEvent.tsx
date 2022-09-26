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
import { commonDateFormat } from '../../../utils/dateFormatUtils'

const NewEvent = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const trainerDetails = {} as TrainerDetails
  const authorDetails = {} as Author
  const employeesAvailability = {} as Availability[]

  const initEvent = {
    agenda: '',
    authorName: authorDetails,
    availability: employeesAvailability,
    conferenceType: '',
    description: '',
    endTime: '',
    eventLocation: '',
    eventTypeId: 0,
    fromDate: '',
    locationId: 1,
    projectName: '',
    roomId: 0,
    startTime: '',
    toDate: '',
    trainerName: trainerDetails,
  } as AddEvent

  const [addEvent, setAddEvent] = useState(initEvent)

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
      fromDate: moment(value).format(commonDateFormat),
    })
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="New Event"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CForm>
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
        <EventEndDate />
        <StartTimeEndTime />
        <CRow className="mt-1 mb-3">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Subject:
            <span>*</span>
          </CFormLabel>
          <CCol sm={5}>
            <CFormTextarea
              placeholder="Purpose"
              aria-label="textarea"
            ></CFormTextarea>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-3">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Description:
            <span>*</span>
          </CFormLabel>
          <CCol sm={6}>
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={''}
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                console.log(editor.getData().trim())
              }}
            />
          </CCol>
        </CRow>
        <SelectProject />
        <Attendees />
        <CRow className="mt-5 mb-4">
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="confirmBtn"
                color="success"
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
    </OCard>
  )
}
export default NewEvent
