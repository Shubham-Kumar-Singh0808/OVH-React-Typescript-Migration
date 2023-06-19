import {
  CRow,
  CCol,
  CForm,
  CButton,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { useHistory } from 'react-router-dom'
import EditAttendees from './EditAttendees'
import EditProjectMembers from './EditProjectMembers'
import EditStartTimeAndEndTime from './EditStartTimeAndEndTime'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  EditMeetingRequest,
  MeetingEditDTOList,
} from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import { TrainerDetails } from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import { convertTime, showIsRequired } from '../../../utils/helper'
import NewBookingLocation from '../NewBooking/NewBookingChildComponents/NewBookingLocation'
import NewBookingRoom from '../NewBooking/NewBookingChildComponents/NewBookingRoom'
import { Attendees, EventFromDate } from '../NewEvent/NewEventChildComponents'
import OToast from '../../../components/ReusableComponent/OToast'
import SlotsBookedForRoom from '../NewBooking/NewBookingChildComponents/SlotsBookedForRoom'

const EditBookingFilterOptions = (): JSX.Element => {
  const trainerDetails = {} as TrainerDetails
  const dateFormat = 'DD/MM/YYYY'
  const [attendeeResponse, setAttendeeReport] = useState<MeetingEditDTOList[]>(
    [],
  )
  const [deleteAttendeeId, setDeleteAttendeeId] = useState<number>()
  const [projectsAutoCompleteTarget, setProjectsAutoCompleteTarget] =
    useState<string>('')
  const [errorMessageCount, setErrorMessageCount] = useState<number>(0)
  const [isProjectChange, setIsProjectChange] = useState<string>('')
  const [isErrorShow, setIsErrorShow] = useState(false)
  const [isAttendeeErrorShow, setIsAttendeeErrorShow] = useState(false)
  const [attendeesAutoCompleteTarget, setAttendeesAutoCompleteTarget] =
    useState<string>()
  const [isProjectAndAttendeesEnable, setIsProjectAndAttendeesEnable] =
    useState(true)

  const loggedEmployee = useTypedSelector(
    reduxServices.newEvent.selectors.loggedEmployee,
  )

  const initNewBooking = {
    id: 0,
    agenda: '',
    roomId: 0,
    roomName: '',
    locationName: '',
    fromDate: '',
    toDate: '',
    startTime: '',
    endTime: '',
    projectName: '',
    employeeIds: null,
    authorName: loggedEmployee,
    employeeNames: [],
    isAuthorisedUser: true,
    locationId: 0,
    employeeAvailability: null,
    timeFomrat: null,
    disableEdit: null,
    meetingEditDTOList: [],
    meetingAttendeesDto: null,
    availability: [],
    meetingStatus: null,
    conferenceType: '',
    eventTypeName: null,
    eventTypeId: 0,
    eventLocation: '',
    eventId: 0,
    description: '',
    eventEditAccess: null,
    empDesignations: null,
    employeeDto: null,
    trainerName: trainerDetails,
    availableDates: '',
  } as EditMeetingRequest
  const [editMeetingRequest, setEditMeetingRequest] = useState(initNewBooking)

  const editExistingMeetingRequest = useTypedSelector(
    reduxServices.bookingList.selectors.editExistingMeetingRequest,
  )

  const allProjectNames = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )
  const allEmployeesProfiles = useTypedSelector(
    reduxServices.newEvent.selectors.allEmployeesProfiles,
  )
  const projectMembers = useTypedSelector(
    reduxServices.newEvent.selectors.projectMembers,
  )
  const meetingLocation = useTypedSelector(
    (state) => state.bookingList.meetingLocation,
  )

  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    if (editExistingMeetingRequest?.meetingEditDTOList != null) {
      setAttendeeReport(editExistingMeetingRequest?.meetingEditDTOList)
    }
  }, [editExistingMeetingRequest?.meetingEditDTOList])

  useEffect(() => {
    if (projectsAutoCompleteTarget) {
      dispatch(
        reduxServices.allocateEmployee.getAllProjectSearchData(
          projectsAutoCompleteTarget,
        ),
      )
    }
  }, [projectsAutoCompleteTarget])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }
  const formLabel = 'col-sm-3 col-form-label text-end'

  const failureValidationErrorToastMessage = (
    <OToast
      toastMessage="Sorry,You can't book room more than two hours"
      toastColor="danger"
    />
  )

  const failureToastMessage = (
    <OToast toastMessage="Please Enter vaild time" toastColor="danger" />
  )

  useEffect(() => {
    if (editExistingMeetingRequest != null) {
      setEditMeetingRequest(editExistingMeetingRequest)
      setProjectsAutoCompleteTarget(editExistingMeetingRequest.projectName)
    }
  }, [editExistingMeetingRequest])

  useEffect(() => {
    if (editExistingMeetingRequest.meetingEditDTOList != null) {
      setAttendeeReport(editExistingMeetingRequest.meetingEditDTOList)
    }
  }, [editExistingMeetingRequest])
  const roomsOfLocation = useTypedSelector(
    (state) => state.bookingList.roomsOfLocation,
  )

  const onHandleLocation = (value: string) => {
    const filterLocationName = meetingLocation?.filter(
      (item) => item.id === Number(value),
    )
    setEditMeetingRequest({
      ...editMeetingRequest,
      locationId: Number(value),
      locationName: filterLocationName[0].locationName,
    })
  }
  const onHandleRoom = (value: string) => {
    const filterRoomName = roomsOfLocation?.filter(
      (item) => item.id === Number(value),
    )
    setEditMeetingRequest({
      ...editMeetingRequest,
      roomId: Number(value),
      roomName: filterRoomName[0].roomName,
    })
  }
  const fromDateChangeHandler = (value: Date) => {
    setEditMeetingRequest({
      ...editMeetingRequest,
      fromDate: moment(value).format(dateFormat),
    })
  }
  const onSelectStartAndEndTime = (val1: string, val2: string) => {
    setEditMeetingRequest({
      ...editMeetingRequest,
      startTime: val1,
      endTime: val2,
    })
  }

  useEffect(() => {
    dispatch(reduxServices.bookingList.getAllMeetingLocations())
    dispatch(reduxServices.newEvent.getLoggedEmployee())
    if (editMeetingRequest.locationId) {
      dispatch(
        reduxServices.bookingList.getRoomsOfLocation(
          Number(editMeetingRequest.locationId),
        ),
      )
    }
  }, [dispatch, editMeetingRequest])

  const onHandleEditSelectProjectName = (projectName: string) => {
    setProjectsAutoCompleteTarget(projectName)
  }

  const autoCompleteOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectsAutoCompleteTarget(e.target.value)
    setIsProjectChange(e.target.value)
  }
  const checkIsAttendeeExists = (attendeeId: number) => {
    return attendeeResponse?.some((attendee) => {
      return attendee.id === attendeeId
    })
  }

  useEffect(() => {
    if (projectsAutoCompleteTarget)
      dispatch(
        reduxServices.newEvent.getProjectMembers(projectsAutoCompleteTarget),
      )
  }, [projectsAutoCompleteTarget])

  const onSelectAttendee = (attendeeId: number, attendeeName: string) => {
    selectEditProjectMember(attendeeId, attendeeName)
    if (checkIsAttendeeExists(attendeeId)) {
      setIsAttendeeErrorShow(true)
    } else {
      setIsAttendeeErrorShow(false)
    }
  }
  useEffect(() => {
    if (
      editMeetingRequest.startTime === '' &&
      editMeetingRequest.endTime === ''
    ) {
      setIsProjectAndAttendeesEnable(true)
    } else {
      setIsProjectAndAttendeesEnable(false)
    }
  }, [editMeetingRequest.startTime, editMeetingRequest.endTime])

  const bookingStartTime = editMeetingRequest?.startTime
  const bookingEndTime = editMeetingRequest?.endTime

  const startHour = bookingStartTime?.split(':')[0]
  const startMinutesDay = bookingStartTime?.split(':')[1]?.split(' ')[0]

  const endHour = bookingEndTime?.split(':')[0]
  const endMinutesDay = bookingEndTime?.split(':')[1]?.split(' ')[0]

  const selectEditProjectMember = async (
    attendeeId: number,
    attendeeName: string,
  ) => {
    const newMeetingRequestId = editMeetingRequest.id
    const prepareObj = {
      attendeeId,
      attendeeName,
      startTime: `${editMeetingRequest.fromDate}/${startHour}/${startMinutesDay}`,
      endTime: `${editMeetingRequest.fromDate}/${endHour}/${endMinutesDay}`,
      meetingRequestId: newMeetingRequestId,
    }
    const uniqueAttendanceResult = await dispatch(
      reduxServices.bookingList.editUniqueAttendee(prepareObj),
    )
    if (
      reduxServices.bookingList.editUniqueAttendee.rejected.match(
        uniqueAttendanceResult,
      ) &&
      uniqueAttendanceResult.payload === 409
    ) {
      const attendeeObj = {
        id: attendeeId,
        availability: 'buzy',
        fullName: attendeeName,
        flag: 'free',
      }
      if (!checkIsAttendeeExists(attendeeId)) {
        setAttendeeReport([attendeeObj, ...attendeeResponse])
        setIsErrorShow(false)
        setAttendeesAutoCompleteTarget('')
      } else {
        setIsErrorShow(true)
      }
    } else {
      const attendeeObj2 = {
        id: attendeeId,
        availability: 'free',
        fullName: attendeeName,
        flag: 'free',
      }
      if (checkIsAttendeeExists(attendeeId)) {
        setIsErrorShow(true)
      } else {
        setAttendeeReport([attendeeObj2, ...attendeeResponse])
        setIsErrorShow(false)
        setAttendeesAutoCompleteTarget('')
      }
    }
  }
  const handleConfirmBtn = async () => {
    const startTimeResult = convertTime(editMeetingRequest.startTime)
    const endTimeResult = convertTime(editMeetingRequest.endTime)

    console.log(startTimeResult)
    console.log(endTimeResult)

    const startTimeHourResult = startTimeResult.split(':')[0]
    const startTimeMinutesResult = startTimeResult.split(':')[1]?.split(' ')[0]

    const endTimeHourResult = endTimeResult.split(':')[0]
    const endTimeMinutes = endTimeResult.split(':')[1]?.split(' ')[0]
    console.log(startTimeHourResult)
    console.log(startTimeMinutesResult)
    const timeCheckResult = await dispatch(
      reduxServices.newEvent.timeCheck(
        `${editMeetingRequest.fromDate}/${startTimeHourResult}/${startTimeMinutesResult}`,
      ),
    )
    const newAttendeesList = attendeeResponse?.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ id, availability }) => {
        return { id, availability }
      },
    )
    const prepareObj = {
      agenda: editMeetingRequest?.agenda,
      authorName: loggedEmployee,
      availability: null,
      availableDates: null,
      conferenceType: 'Meeting',
      description: null,
      disableEdit: null,
      empDesignations: null,
      employeeAvailability: null,
      employeeDto: null,
      employeeIds: null,
      employeeNames: editMeetingRequest.employeeNames,
      endTime: `${editMeetingRequest.fromDate}/${endTimeHourResult}/${endTimeMinutes}`,
      eventEditAccess: null,
      eventId: null,
      eventLocation: null,
      eventTypeId: null,
      eventTypeName: null,
      fromDate: editMeetingRequest?.fromDate,
      id: editMeetingRequest.id,
      isAuthorisedUser: true,
      locationId: editMeetingRequest.locationId,
      locationName: editMeetingRequest.locationName,
      meetingAttendeesDto: null,
      meetingEditDTOList: newAttendeesList,
      meetingStatus: null,
      projectName: projectsAutoCompleteTarget,
      roomId: editMeetingRequest.roomId,
      roomName: editMeetingRequest.roomName,
      startTime: `${editMeetingRequest.fromDate}/${startTimeHourResult}/${startTimeMinutesResult}`,
      timeFomrat: null,
      toDate: null,
      trainerName: null,
    }
    if (timeCheckResult.payload === false) {
      const addEventResult = await dispatch(
        reduxServices.bookingList.confirmUpdateMeetingRequest(prepareObj),
      )
      if (
        reduxServices.bookingList.confirmUpdateMeetingRequest.fulfilled.match(
          addEventResult,
        )
      ) {
        history.push('/meetingList')
        dispatch(
          reduxServices.app.actions.addToast(
            <OToast
              toastColor="success"
              toastMessage="Meeting Request Updated Successfully"
            />,
          ),
        )
      } else if (
        reduxServices.bookingList.confirmUpdateMeetingRequest.rejected.match(
          addEventResult,
        ) &&
        addEventResult.payload === 409
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

  const ClearButtonHandler = () => {
    history.push('/meetingList')
  }
  console.log(errorMessageCount)
  const validateBookingTimings = () => {
    if (
      editMeetingRequest.startTime.split(':') <
      editMeetingRequest.endTime.split(':')
    ) {
      const startTimeSplit = editMeetingRequest.startTime.split(':')
      const endTimeSplit = editMeetingRequest.endTime.split(':')
      const start = new Date(
        `${editMeetingRequest.fromDate} ${startTimeSplit[0]}:${startTimeSplit[1]}`,
      )
      const end = new Date(
        `${editMeetingRequest.fromDate} ${endTimeSplit[0]}:${endTimeSplit[1]}`,
      )

      const durationInMs = end.getTime() - start.getTime()
      const durationInHours = durationInMs / (1000 * 60 * 60)
      if (durationInHours > 2) {
        setErrorMessageCount((messageCount) => messageCount + 1)
        dispatch(
          reduxServices.app.actions.addToast(
            failureValidationErrorToastMessage,
          ),
        )
      } else {
        handleConfirmBtn()
      }
    } else {
      setErrorMessageCount((messageCount) => messageCount + 1)
      dispatch(reduxServices.app.actions.addToast(failureToastMessage))
    }
  }

  useEffect(() => {
    if ((editMeetingRequest.roomId, editMeetingRequest.fromDate)) {
      dispatch(
        reduxServices.newBooking.getAllBookedDetailsForRoom({
          date: editMeetingRequest.fromDate,
          roomid: editMeetingRequest.roomId,
        }),
      )
    }
  }, [editMeetingRequest.roomId, editMeetingRequest.fromDate])

  const BookingsForSelection = useTypedSelector(
    reduxServices.bookingList.selectors.bookingsForSelection,
  )

  const slotBooked = BookingsForSelection?.filter(
    (item) => item.roomId === editMeetingRequest.roomId,
  )

  return (
    <>
      <CRow>
        <CCol sm={8}>
          <CForm className="ms-4">
            <CRow className="mt-1 mb-3">
              <NewBookingLocation
                onHandleLocation={onHandleLocation}
                locationValue={editMeetingRequest.locationId}
              />
            </CRow>
            <CRow className="mt-1 mb-3">
              <NewBookingRoom
                onHandleRoom={onHandleRoom}
                roomValue={editMeetingRequest.roomId}
              />
            </CRow>
            <CRow className="mt-1 mb-3">
              <CFormLabel
                className="col-sm-3 col-form-label text-end"
                data-testid="pmLabel"
              >
                Reserved by:
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  autoComplete="off"
                  type="text"
                  id="Name"
                  name="personName"
                  placeholder="Name"
                  data-testid="person-name"
                  value={editMeetingRequest?.authorName?.fullName}
                  disabled
                />
              </CCol>
            </CRow>
            <EventFromDate
              fromDateValue={editMeetingRequest?.fromDate}
              fromDateChangeHandler={fromDateChangeHandler}
            />
            <EditStartTimeAndEndTime
              onSelectStartAndEndTime={onSelectStartAndEndTime}
            />
            <CRow className="mt-1 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Agenda:
                <span
                  className={showIsRequired(
                    editMeetingRequest?.agenda?.replace(/^\s*/, ''),
                  )}
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={6}>
                <CFormTextarea
                  className="sh-agenda"
                  placeholder="Purpose"
                  data-testid="text-area"
                  aria-label="textarea"
                  value={editMeetingRequest?.agenda}
                  onChange={(e) => {
                    setEditMeetingRequest({
                      ...editMeetingRequest,
                      agenda: e.target.value,
                    })
                  }}
                ></CFormTextarea>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CFormLabel {...formLabelProps} className={formLabel}>
                Project Name:
              </CFormLabel>
              <CCol sm={6}>
                <Autocomplete
                  inputProps={{
                    className: 'form-control form-control-sm',
                    placeholder: 'Project Name',
                  }}
                  getItemValue={(item) => item.projectName}
                  items={allProjectNames ? allProjectNames : []}
                  wrapperStyle={{ position: 'relative' }}
                  renderMenu={(children) => (
                    <div
                      className={
                        projectsAutoCompleteTarget &&
                        projectsAutoCompleteTarget.length > 0
                          ? 'autocomplete-dropdown-wrap'
                          : 'autocomplete-dropdown-wrap hide'
                      }
                    >
                      {children}
                    </div>
                  )}
                  renderItem={(item, isHighlighted) => (
                    <div
                      data-testid="project-option"
                      className={
                        isHighlighted
                          ? 'autocomplete-dropdown-item active'
                          : 'autocomplete-dropdown-item '
                      }
                      key={item.id}
                    >
                      {item.projectName}
                    </div>
                  )}
                  value={projectsAutoCompleteTarget}
                  shouldItemRender={(item, itemValue) =>
                    item?.projectName
                      ?.toLowerCase()
                      .indexOf(itemValue.toLowerCase()) > -1
                  }
                  onChange={(e) => autoCompleteOnChangeHandler(e)}
                  onSelect={(selectedVal) =>
                    onHandleEditSelectProjectName(selectedVal)
                  }
                />
              </CCol>
            </CRow>
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
            <CRow className="row d-flex justify-content-center">
              {projectMembers?.length > 0 && isProjectChange && (
                <EditProjectMembers
                  editMeetingRequest={editMeetingRequest}
                  projectMembers={projectMembers}
                  attendeeResponse={attendeeResponse}
                  setAttendeeReport={setAttendeeReport}
                  selectEditProjectMember={selectEditProjectMember}
                  setIsErrorShow={setIsErrorShow}
                  setIsAttendeeErrorShow={setIsAttendeeErrorShow}
                  checkIsAttendeeExists={checkIsAttendeeExists}
                  deleteAttendeeId={deleteAttendeeId}
                />
              )}

              {attendeeResponse.length > 0 ? (
                <EditAttendees
                  attendeeResponse={attendeeResponse}
                  setAttendeeReport={setAttendeeReport}
                  deleteAttendeeId={deleteAttendeeId}
                  setDeleteAttendeeId={setDeleteAttendeeId}
                />
              ) : (
                <></>
              )}
            </CRow>
            <CRow className="mt-5 mb-4">
              <CCol md={{ span: 6, offset: 3 }}>
                <>
                  <CButton
                    className="btn-ovh me-1"
                    data-testid="confirmBtn"
                    color="success"
                    onClick={validateBookingTimings}
                  >
                    Update
                  </CButton>
                  <CButton
                    color="warning "
                    data-testid="clearBtn"
                    className="btn-ovh"
                    onClick={ClearButtonHandler}
                  >
                    Cancel
                  </CButton>
                </>
              </CCol>
            </CRow>
          </CForm>
        </CCol>
        {slotBooked.length > 0 && editMeetingRequest.fromDate ? (
          <CCol sm={4}>
            <SlotsBookedForRoom />
          </CCol>
        ) : (
          <></>
        )}
      </CRow>
    </>
  )
}

export default EditBookingFilterOptions
