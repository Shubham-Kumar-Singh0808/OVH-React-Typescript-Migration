import {
  CRow,
  CCol,
  CForm,
  CButton,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import EditAttendees from './EditAttendees'
import EditProjectMembers from './EditProjectMembers'
import EditStartTimeAndEndTime from './EditStartTimeAndEndTime'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  EditMeetingRequest,
  MeetingEditDTOList,
} from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import {
  Author,
  Availability,
} from '../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import { TrainerDetails } from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import { GetAllProjects } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import { showIsRequired } from '../../../utils/helper'
import NewBookingLocation from '../NewBooking/NewBookingChildComponents/NewBookingLocation'
import NewBookingRoom from '../NewBooking/NewBookingChildComponents/NewBookingRoom'
import {
  Attendees,
  EventFromDate,
  SelectProject,
  StartTimeEndTime,
} from '../NewEvent/NewEventChildComponents'
import ProjectMembersSelection from '../NewEvent/NewEventChildComponents/ProjectMembersSelection'
import SelectedAttendees from '../NewEvent/NewEventChildComponents/SelectedAttendees'
import OToast from '../../../components/ReusableComponent/OToast'

const EditBookingFilterOptions = (): JSX.Element => {
  const editExistingMeetingRequest = useTypedSelector(
    reduxServices.bookingList.selectors.editExistingMeetingRequest,
  )
  const [attendeeResponse, setAttendeeReport] = useState<MeetingEditDTOList[]>(
    [],
  )
  const loggedEmployee = useTypedSelector(
    reduxServices.newEvent.selectors.loggedEmployee,
  )
  const [selectProject, setSelectProject] = useState<GetAllProjects>()
  const [projectsAutoCompleteTarget, setProjectsAutoCompleteTarget] =
    useState<string>('')
  const [isProjectChange, setIsProjectChange] = useState<string>('')
  const allProjectNames = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )

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
  const authorDetails = {} as Author
  const meetingEditDTOList = {} as MeetingEditDTOList[]
  const availability = {} as Availability[]
  const trainerDetails = {} as TrainerDetails
  const dateFormat = 'DD/MM/YYYY'
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
    projectName: editExistingMeetingRequest.projectName,
    employeeIds: null,
    authorName: loggedEmployee,
    employeeNames: [],
    isAuthorisedUser: true,
    locationId: 0,
    employeeAvailability: null,
    timeFomrat: null,
    disableEdit: null,
    meetingEditDTOList,
    meetingAttendeesDto: null,
    availability,
    meetingStatus: null,
    conferenceType: '',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 0,
    description: '',
    eventEditAccess: null,
    empDesignations: null,
    employeeDto: null,
    trainerName: trainerDetails,
    availableDates: '',
  } as unknown as EditMeetingRequest
  const dispatch = useAppDispatch()

  const [editMeetingRequest, setEditMeetingRequest] = useState(initNewBooking)
  const [attendeesList, setAttendeesList] = useState<Availability[]>([])
  const [isErrorShow, setIsErrorShow] = useState(false)
  const [isAttendeeErrorShow, setIsAttendeeErrorShow] = useState(false)
  const [attendeesAutoCompleteTarget, setAttendeesAutoCompleteTarget] =
    useState<string>()
  const [isProjectAndAttendeesEnable, setIsProjectAndAttendeesEnable] =
    useState(true)
  useEffect(() => {
    if (editExistingMeetingRequest != null) {
      setEditMeetingRequest(editExistingMeetingRequest)
      setProjectsAutoCompleteTarget(editExistingMeetingRequest.projectName)
    }
  }, [editExistingMeetingRequest])

  const time = editMeetingRequest?.startTime
  const Hour = time?.split(':')[0]
  const meridian = time?.split(' ')[1]
  const minutesDay = time?.split(':')[1]?.split(' ')[0]

  console.log(Hour)
  console.log(meridian)
  console.log(minutesDay)
  console.log(editMeetingRequest?.startTime)
  const allEmployeesProfiles = useTypedSelector(
    reduxServices.newEvent.selectors.allEmployeesProfiles,
  )
  const projectMembers = useTypedSelector(
    reduxServices.newEvent.selectors.projectMembers,
  )
  const onHandleLocation = (value: string) => {
    setEditMeetingRequest({ ...editMeetingRequest, locationId: Number(value) })
  }
  const onHandleRoom = (value: string) => {
    setEditMeetingRequest({ ...editMeetingRequest, roomId: Number(value) })
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
    if (editMeetingRequest.locationId) {
      dispatch(
        reduxServices.bookingList.getRoomsOfLocation(
          Number(editMeetingRequest.locationId),
        ),
      )
    }
  }, [dispatch, editMeetingRequest])

  const onHandleSelectProjectName = (projectName: string) => {
    setProjectsAutoCompleteTarget(projectName)
  }

  const autoCompleteOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectsAutoCompleteTarget(e.target.value)
    setSelectProject(undefined)
    setIsProjectChange(e.target.value)
  }
  const checkIsAttendeeExists = (attendeeId: number) => {
    return attendeeResponse.some((attendee) => {
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
    selectProjectMember(attendeeId, attendeeName)
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
  const selectProjectMember = async (
    attendeeId: number,
    attendeeName: string,
  ) => {
    const newMeetingRequestId = editMeetingRequest.id
    const prepareObj = {
      attendeeId,
      attendeeName,
      startTime: `${editMeetingRequest.fromDate}/${Hour}/${minutesDay}`,
      endTime: `${editMeetingRequest.fromDate}/${Hour}/${minutesDay}`,
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
  const bookingStartTime = editExistingMeetingRequest?.startTime
  const bookingEndTime = editExistingMeetingRequest?.endTime

  const startHour = bookingStartTime?.split(':')[0]
  const startMeridian = bookingStartTime?.split(' ')[1]
  const startMinutesDay = bookingStartTime?.split(':')[1]?.split(' ')[0]

  const endHour = bookingEndTime?.split(':')[0]
  const endMeridian = bookingEndTime?.split(' ')[1]
  const endMinutesDay = bookingEndTime?.split(':')[1]?.split(' ')[0]
  const handleConfirmBtn = async () => {
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
      employeeNames: '',
      endTime: `${editMeetingRequest.fromDate}/${endHour}/${endMinutesDay}`,
      eventEditAccess: null,
      eventId: null,
      eventLocation: null,
      eventTypeId: null,
      eventTypeName: null,
      fromDate: moment(new Date()).format('DD/MM/YYYY'),
      id: editMeetingRequest.id,
      isAuthorisedUser: true,
      locationId: editMeetingRequest.locationId as number,
      locationName: editMeetingRequest.locationName,
      meetingAttendeesDto: null,
      meetingEditDTOList,
      meetingStatus: null,
      projectName: selectProject?.projectName as string,
      roomId: editMeetingRequest.roomId,
      roomName: editMeetingRequest.roomName,
      startTime: `${editMeetingRequest.fromDate}/${startHour}/${startMinutesDay}`,
      timeFomrat: null,
      toDate: null,
      trainerName: null,
    }
    const addEventResult = await dispatch(
      reduxServices.bookingList.confirmUpdateMeetingRequest(prepareObj),
    )
    if (
      reduxServices.bookingList.confirmUpdateMeetingRequest.fulfilled.match(
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
                <span
                  className={
                    projectsAutoCompleteTarget ? TextWhite : TextDanger
                  }
                >
                  *
                </span>
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
                    onHandleSelectProjectName(selectedVal)
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
            <CRow className="mt-4 ms-5">
              <CCol sm={12}>
                <CRow>
                  {projectMembers?.length > 0 && isProjectChange && (
                    <EditProjectMembers
                      editMeetingRequest={editMeetingRequest}
                      projectMembers={projectMembers}
                      attendeeResponse={attendeeResponse}
                      setAttendeeReport={setAttendeeReport}
                      selectProjectMember={selectProjectMember}
                      isErrorShow={isErrorShow}
                      setIsErrorShow={setIsErrorShow}
                      setIsAttendeeErrorShow={setIsAttendeeErrorShow}
                      checkIsAttendeeExists={checkIsAttendeeExists}
                    />
                  )}
                  <EditAttendees
                    attendeeResponse={attendeeResponse}
                    setAttendeeReport={setAttendeeReport}
                  />
                  {/* <SelectedAttendees
                    attendeesList={attendeesList}
                    deleteBtnHandler={deleteBtnHandler}
                  /> */}
                </CRow>
              </CCol>
            </CRow>

            <CRow className="mt-5 mb-4">
              <CCol md={{ span: 6, offset: 3 }}>
                <>
                  <CButton
                    className="btn-ovh me-1"
                    data-testid="confirmBtn"
                    color="success"
                    onClick={handleConfirmBtn}
                    // disabled={!isConfirmButtonEnabled}
                  >
                    Update
                  </CButton>
                  <CButton
                    color="warning "
                    data-testid="clearBtn"
                    className="btn-ovh"
                    // onClick={ClearButtonHandler}
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

export default EditBookingFilterOptions
