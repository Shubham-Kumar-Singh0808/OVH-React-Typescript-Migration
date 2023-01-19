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

const EditBookingFilterOptions = (): JSX.Element => {
  const editExistingMeetingRequest = useTypedSelector(
    reduxServices.bookingList.selectors.editExistingMeetingRequest,
  )
  const [isEnable, setIsEnable] = useState(false)
  const [selectProject, setSelectProject] = useState<GetAllProjects>()
  const [projectsAutoCompleteTarget, setProjectsAutoCompleteTarget] =
    useState<string>('')
  const allProjects = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )
  const allProjectNames = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )

  console.log(projectsAutoCompleteTarget)
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
    authorName: authorDetails,
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
  const [projectName, setProjectName] = useState<string>('')
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

  const onHandleSelectProjectName = (projectName: string) => {
    setProjectsAutoCompleteTarget(projectName)
    setIsEnable(true)
  }

  const autoCompleteOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectsAutoCompleteTarget(e.target.value)
    setSelectProject(undefined)
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
    const newStartTime = editMeetingRequest.startTime.split(':')
    const newEndTime = editMeetingRequest.endTime.split(':')
    const prepareObj = {
      attendeeId,
      attendeeName,
      startTime: `${editMeetingRequest.fromDate}/${newStartTime[0]}/${newStartTime[1]}`,
      endTime: `${editMeetingRequest.fromDate}/${newEndTime[0]}/${newEndTime[1]}`,
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
  console.log(editMeetingRequest.locationId)
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
            <StartTimeEndTime
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
            {/* <SelectProject
              allProjects={allProjects}
              onSelectProject={onSelectProject}
              isProjectAndAttendeesEnable={isProjectAndAttendeesEnable}
            /> */}
            <CRow className="mt-3">
              <CFormLabel {...formLabelProps} className={formLabel}>
                Project Name:
                <span className={isEnable ? TextWhite : TextDanger}>*</span>
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
            <CTable responsive striped className="align-middle">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Attendees</CTableHeaderCell>
                  <CTableHeaderCell>Availability</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {editExistingMeetingRequest?.meetingEditDTOList?.map(
                  (item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell>{item?.fullName}</CTableDataCell>
                        <CTableDataCell>{item?.availability}</CTableDataCell>
                      </CTableRow>
                    )
                  },
                )}
              </CTableBody>
            </CTable>
            {projectMembers?.length > 0 && (
              <ProjectMembersSelection
                addEvent={editMeetingRequest}
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
