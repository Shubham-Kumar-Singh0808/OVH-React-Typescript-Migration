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
import SelectedAttendees from './NewEventChildComponents/SelectedAttendees'
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
import { ShouldResetNewBookingFields } from '../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import { dateFormat } from '../../../constant/DateFormat'

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

  const initResetFields = {
    projectName: false,
    startEndTime: false,
    trainer: false,
  } as ShouldResetNewBookingFields

  const [resetFields, setResetField] = useState(initResetFields)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [addEvent, setAddEvent] = useState(initEvent)
  const [descriptionValue, setDescriptionValue] = useState('')
  const [dateError, setDateError] = useState<boolean>(false)
  const [isProjectAndAttendeesEnable, setIsProjectAndAttendeesEnable] =
    useState(true)
  const [attendeesList, setAttendeesList] = useState<Availability[]>([])
  const [isErrorShow, setIsErrorShow] = useState(false)
  const [isAttendeeErrorShow, setIsAttendeeErrorShow] = useState(false)
  const [attendeesAutoCompleteTarget, setAttendeesAutoCompleteTarget] =
    useState<string>()
  const [isConfirmButtonEnabled, setIsConfirmButtonEnabled] = useState(false)
  console.log(attendeesList)
  const [trainerAutoCompleteTarget, setTrainerAutoCompleteTarget] =
    useState<string>()
  const [deleteAttendeeId, setDeleteAttendeeId] = useState<number>()
  const [deleteAttendeeModalVisible, setDeleteAttendeeModalVisible] =
    useState(false)
  const [errorMessageCount, setErrorMessageCount] = useState<number>(0)

  const deleteBtnHandler = (id: number) => {
    setDeleteAttendeeId(id)
    setDeleteAttendeeModalVisible(true)
  }

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
  console.log(errorMessageCount)
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
    setResetField({ ...resetFields, trainer: false })
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
    setResetField({ ...resetFields, startEndTime: false })
    setAddEvent({ ...addEvent, startTime: val1, endTime: val2 })
  }
  const onHandleDescription = (value: string) => {
    setDescriptionValue(value)
  }
  const onSelectProject = (value: string) => {
    setResetField({ ...resetFields, projectName: false })
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
  console.log(addEvent.startTime)

  const failureValidationErrorToastMsg = (
    <OToast
      toastMessage="Sorry,You can't book room more than two hours"
      toastColor="danger"
    />
  )

  const failureToastMsg = (
    <OToast toastMessage="Please Enter vaild time" toastColor="danger" />
  )

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
    } else {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            Sorry, you missed the selected time..!!"
          />,
        ),
      )
    }
  }

  const validateBookingTimings = () => {
    if (addEvent.startTime.split(':') < addEvent.endTime.split(':')) {
      const startTimeSplit = addEvent.startTime.split(':')
      const endTimeSplit = addEvent.endTime.split(':')
      const start = new Date(
        `${addEvent.fromDate} ${startTimeSplit[0]}:${startTimeSplit[1]}`,
      )
      const end = new Date(
        `${addEvent.fromDate} ${endTimeSplit[0]}:${endTimeSplit[1]}`,
      )

      const durationInMs = end.getTime() - start.getTime()
      const durationInHours = durationInMs / (1000 * 60 * 60)
      if (durationInHours > 2) {
        setErrorMessageCount((messageCount) => messageCount + 1)
        dispatch(
          reduxServices.app.actions.addToast(failureValidationErrorToastMsg),
        )
      } else {
        handleConfirmBtn()
      }
    } else {
      setErrorMessageCount((messageCount) => messageCount + 1)
      dispatch(reduxServices.app.actions.addToast(failureToastMsg))
    }
  }

  const clearBtnHandler = () => {
    setAddEvent(initEvent)
    const shouldResetFields = {
      projectName: true,
      startEndTime: true,
      trainer: true,
    } as ShouldResetNewBookingFields
    setResetField(shouldResetFields)
    setIsAttendeeErrorShow(false)
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setAttendeesList([])
  }
  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(addEvent.fromDate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(addEvent.toDate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setDateError(moment(end).isBefore(start))
  }, [addEvent.fromDate, addEvent.toDate])

  useEffect(() => {
    if (
      trainerAutoCompleteTarget &&
      addEvent.eventTypeId &&
      addEvent?.startTime &&
      addEvent?.endTime &&
      addEvent?.toDate &&
      addEvent?.agenda?.replace(/^\s*/, '')
    ) {
      setIsConfirmButtonEnabled(true)
    } else {
      setIsConfirmButtonEnabled(false)
    }
  }, [addEvent])
  const attendeesResult = (
    <CRow className="row d-flex justify-content-center">
      {attendeesList?.length > 0 ? (
        <SelectedAttendees
          attendeesList={attendeesList}
          deleteBtnHandler={deleteBtnHandler}
        />
      ) : (
        <></>
      )}
    </CRow>
  )

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
              shouldReset={resetFields.trainer as boolean}
              trainerAutoCompleteTarget={trainerAutoCompleteTarget}
              setTrainerAutoCompleteTarget={setTrainerAutoCompleteTarget}
            />
            <EventType
              eventTypeList={eventTypeList}
              eventTypeValue={addEvent.eventTypeId as number}
              onHandleEventType={onHandleEventType}
            />
            <EventFromDate
              fromDateValue={addEvent.fromDate}
              fromDateChangeHandler={fromDateChangeHandler}
            />
            <EventEndDate
              toDateValue={addEvent.toDate as string}
              toDateChangeHandler={toDateChangeHandler}
            />
            {dateError && (
              <CRow className="mt-2">
                <CCol sm={{ span: 6, offset: 3 }}>
                  <span className="text-danger" data-testid="errorMessage">
                    <b>End Date should be greater than Start Date</b>
                  </span>
                </CCol>
              </CRow>
            )}
            <StartTimeEndTime
              onSelectStartAndEndTime={onSelectStartAndEndTime}
              shouldReset={resetFields.startEndTime}
            />
            <CRow className="mt-1 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Subject :
                <span
                  className={showIsRequired(
                    addEvent.agenda?.replace(/^\s*/, ''),
                  )}
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={7}>
                <CFormTextarea
                  className="sh-agenda"
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
              <CFormLabel className="col-sm-3 col-form-label text-end p-18">
                Description :
                <span
                  className={showIsRequired(
                    descriptionValue?.replace(/^\s*/, ''),
                  )}
                >
                  *
                </span>
              </CFormLabel>
              {showEditor ? (
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
              ) : (
                ''
              )}
            </CRow>
            <SelectProject
              allProjects={allProjects}
              onSelectProject={onSelectProject}
              isProjectAndAttendeesEnable={isProjectAndAttendeesEnable}
              shouldReset={resetFields.projectName}
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
            {projectMembers?.length > 0 && addEvent.projectName.length > 0 ? (
              <>
                <ProjectMembersSelection
                  addEvent={addEvent}
                  projectMembers={projectMembers}
                  attendeesList={attendeesList}
                  setAttendeesList={setAttendeesList}
                  selectProjectMember={selectProjectMember}
                  setIsErrorShow={setIsErrorShow}
                  setIsAttendeeErrorShow={setIsAttendeeErrorShow}
                  checkIsAttendeeExists={checkIsAttendeeExists}
                  isErrorShow={isErrorShow}
                  deleteAttendeeId={deleteAttendeeId as number}
                  deleteAttendeeModalVisible={deleteAttendeeModalVisible}
                  deleteBtnHandler={deleteBtnHandler}
                  setDeleteAttendeeModalVisible={setDeleteAttendeeModalVisible}
                />
              </>
            ) : (
              <></>
            )}
            {projectMembers?.length > 0 && addEvent.projectName.length > 0
              ? ''
              : attendeesResult}
            <CRow className="mt-5 mb-4">
              <CCol md={{ span: 6, offset: 3 }}>
                <>
                  <CButton
                    className="btn-ovh me-1"
                    data-testid="confirmBtn"
                    color="success"
                    onClick={validateBookingTimings}
                    disabled={!isConfirmButtonEnabled || dateError}
                  >
                    Confirm
                  </CButton>
                  <CButton
                    color="warning "
                    data-testid="clearBtn"
                    className="btn-ovh"
                    onClick={clearBtnHandler}
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
