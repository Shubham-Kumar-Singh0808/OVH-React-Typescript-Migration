import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import Autocomplete from 'react-autocomplete'
import RoomAndLocation from './EditEventChildComponents/RoomAndLocation'
import ReservedBy from './EditEventChildComponents/ReservedBy'
import FromAndToDate from './EditEventChildComponents/FromAndToDate'
import EventStartTimeEndTime from './EditEventChildComponents/EventStartTimeEndTime'
import EventAttendees from './EditEventChildComponents/EventAttendees'
import ProjectMembersSelectionForEvent from './EditEventChildComponents/ProjectMembersSelectionForEvent'
import EditEventAttendees from './EditEventChildComponents/EditEventAttendees'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { MeetingEditDTOList } from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'
import { showIsRequired } from '../../../utils/helper'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import OToast from '../../../components/ReusableComponent/OToast'

const EditEvent = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const editExistingEvent = useTypedSelector(
    reduxServices.eventList.selectors.editExistingEventData,
  )
  const history = useHistory()
  const formLabelProps = {
    htmlFor: 'inputEditEvent',
    className: 'col-form-label category-label',
  }
  const formLabel = 'col-sm-3 col-form-label text-end'
  const [attendeesResponse, setAttendeesResponse] = useState<
    MeetingEditDTOList[]
  >([])
  const [deleteAttendeeId, setDeleteAttendeeId] = useState<number>()

  const [projectAutoCompleteTarget, setProjectAutoCompleteTarget] =
    useState<string>('')
  const [trainerAutoCompleteTarget, setTrainerAutoCompleteTarget] =
    useState<string>('')
  const [isProjectChange, setIsProjectChange] = useState<string>('')

  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const allProjectNames = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )

  const allEmployeesProfiles = useTypedSelector(
    reduxServices.newEvent.selectors.allEmployeesProfiles,
  )
  const projectMembers = useTypedSelector(
    reduxServices.newEvent.selectors.projectMembers,
  )
  const eventLocations = useTypedSelector(
    reduxServices.addLocationList.selectors.locationNames,
  )

  const locationRooms = useTypedSelector(
    reduxServices.newEvent.selectors.roomsByLocation,
  )

  const [editEvent, setEditEvent] = useState(editExistingEvent)
  const [showDescription, setShowDescription] = useState<boolean>(true)
  const [isProjectAndAttendeesEnable, setIsProjectAndAttendeesEnable] =
    useState(true)
  const [isErrorShow, setIsErrorShow] = useState(false)
  const [attendeesAutoCompleteTarget, setAttendeesAutoCompleteTarget] =
    useState<string>()
  const [isAttendeeErrorShow, setIsAttendeeErrorShow] = useState(false)

  const eventStartTime = editEvent?.startTime
  const eventEndTime = editEvent?.endTime

  const eventStartHour = eventStartTime?.split(':')[0]
  const eventStartMinutesDay = eventStartTime?.split(':')[1]?.split(' ')[0]

  const eventEndHour = eventEndTime?.split(':')[0]
  const eventEndMinutesDay = eventEndTime?.split(':')[1]?.split(' ')[0]

  useEffect(() => {
    if (
      trainerAutoCompleteTarget?.length > 0 &&
      trainerAutoCompleteTarget?.replace(/^\s*/, '') !== '' &&
      trainerAutoCompleteTarget?.replace(/^\s*/, '') != null &&
      editEvent?.agenda &&
      editEvent?.description
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editEvent?.agenda, trainerAutoCompleteTarget, editEvent?.description])

  useEffect(() => {
    dispatch(reduxServices.addLocationList.getAllMeetingLocationsData())
    dispatch(reduxServices.newEvent.getLoggedEmployee())
    if (editEvent?.roomId) {
      dispatch(
        reduxServices.newEvent.getRoomsByLocation(Number(editEvent.locationId)),
      )
    }
  }, [dispatch, editEvent])

  useEffect(() => {
    if (editExistingEvent != null) {
      setEditEvent(editExistingEvent)
      setProjectAutoCompleteTarget(editExistingEvent.projectName)
      setTrainerAutoCompleteTarget(editExistingEvent?.trainerName?.fullName)
      setShowDescription(false)
      setTimeout(() => {
        setShowDescription(true)
      }, 100)
    }
  }, [editExistingEvent])

  useEffect(() => {
    if (editExistingEvent?.meetingEditDTOList != null) {
      setAttendeesResponse(editExistingEvent.meetingEditDTOList)
    }
  }, [editExistingEvent])

  useEffect(() => {
    if (projectAutoCompleteTarget) {
      dispatch(
        reduxServices.allocateEmployee.getAllProjectSearchData(
          projectAutoCompleteTarget,
        ),
      )
    }
  }, [projectAutoCompleteTarget])

  useEffect(() => {
    if (trainerAutoCompleteTarget)
      dispatch(
        reduxServices.newEvent.getAllEmployees(trainerAutoCompleteTarget),
      )
  }, [trainerAutoCompleteTarget])

  useEffect(() => {
    if (editEvent?.startTime === '' && editEvent?.endTime === '') {
      setIsProjectAndAttendeesEnable(true)
    } else {
      setIsProjectAndAttendeesEnable(false)
    }
  }, [editEvent?.startTime, editEvent?.endTime])

  const handleDescription = (description: string) => {
    setEditEvent((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }
  useEffect(() => {
    if (projectAutoCompleteTarget)
      dispatch(
        reduxServices.newEvent.getProjectMembers(projectAutoCompleteTarget),
      )
  }, [projectAutoCompleteTarget])
  const onSelectStartAndEndTime = (val1: string, val2: string) => {
    setEditEvent({
      ...editEvent,
      startTime: val1,
      endTime: val2,
    })
  }

  const checkIsAttendeeExists = (attendeeId: number) => {
    return attendeesResponse.some((attendee) => {
      return attendee.id === attendeeId
    })
  }

  const onHandleSelectProjectName = (projectName: string) => {
    setProjectAutoCompleteTarget(projectName)
  }
  const onHandleSelectTrainer = (trainerName: string) => {
    setTrainerAutoCompleteTarget(trainerName)
  }

  const projectsOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectAutoCompleteTarget(e.target.value)
    setIsProjectChange(e.target.value)
  }

  const selectProjectMember = async (
    attendeeId: number,
    attendeeName: string,
  ) => {
    const newMeetingRequestId = editEvent.id
    const prepareObj = {
      attendeeId,
      attendeeName,
      startTime: `${editEvent.fromDate}/${eventStartHour}/${eventStartMinutesDay}`,
      endTime: `${editEvent.fromDate}/${eventEndHour}/${eventEndMinutesDay}`,
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
        setAttendeesResponse([attendeeObj, ...attendeesResponse])
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
        setAttendeesResponse([attendeeObj2, ...attendeesResponse])
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
  const handleConfirmBtn = async () => {
    const newAttendeesList = attendeesResponse?.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ id, availability }) => {
        return { id, availability }
      },
    )
    const prepareObj = {
      agenda: editEvent?.agenda,
      authorName: editEvent.authorName,
      availability: editEvent?.availability,
      availableDates: null,
      conferenceType: 'Event',
      description: editEvent?.description,
      disableEdit: null,
      empDesignations: null,
      employeeAvailability: null,
      employeeDto: null,
      employeeIds: null,
      employeeNames: editEvent.employeeNames,
      endTime: `${editEvent.fromDate}/${eventEndHour}/${eventEndMinutesDay}`,
      eventEditAccess: null,
      eventId: null,
      eventLocation: editEvent?.eventLocation,
      eventTypeId: editEvent?.eventTypeId,
      eventTypeName: editEvent?.eventTypeName,
      fromDate: editEvent?.fromDate,
      id: editEvent.id,
      isAuthorisedUser: editEvent?.isAuthorisedUser,
      locationId: editEvent.locationId,
      locationName: editEvent.locationName,
      meetingAttendeesDto: null,
      meetingEditDTOList: newAttendeesList,
      meetingStatus: null,
      projectName: projectAutoCompleteTarget,
      roomName: editEvent.roomName,
      startTime: `${editEvent.fromDate}/${eventStartHour}/${eventStartMinutesDay}`,
      timeFomrat: null,
      toDate: editEvent?.toDate,
      trainerName: allEmployeesProfiles?.filter(
        (trainer) => trainer.fullName === trainerAutoCompleteTarget,
      )[0],
    }
    const updateEventResult = await dispatch(
      reduxServices.eventList.updateEvent(prepareObj),
    )
    if (
      reduxServices.eventList.updateEvent.fulfilled.match(updateEventResult)
    ) {
      history.push('/eventList')
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Event Updated Successfully"
          />,
        ),
      )
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
              eventLocations={eventLocations}
              locationRooms={locationRooms}
              eventLocationValue={editEvent?.locationId}
              eventRoomValue={editEvent?.roomId}
            />
            <ReservedBy eventReservedBy={editEvent?.authorName?.fullName} />
            <CRow className="mt-1 mb-3">
              <CFormLabel
                className="col-sm-3 col-form-label text-end"
                data-testid="pmLabel"
              >
                Trainer:
                {trainerAutoCompleteTarget === undefined ||
                trainerAutoCompleteTarget?.trim() === '' ? (
                  <span className="text-danger">*</span>
                ) : (
                  <span className="text-white"></span>
                )}
              </CFormLabel>
              <CCol sm={6}>
                <Autocomplete
                  inputProps={{
                    className: 'form-control form-control-sm',
                    id: 'trainer-autocomplete',
                    placeholder: 'Trainer',
                  }}
                  getItemValue={(item) => item.fullName}
                  items={allEmployeesProfiles}
                  data-testid="author-input"
                  wrapperStyle={{ position: 'relative' }}
                  renderMenu={(children) => (
                    <div
                      className={
                        trainerAutoCompleteTarget &&
                        trainerAutoCompleteTarget.length > 0
                          ? 'autocomplete-dropdown-wrap'
                          : 'autocomplete-dropdown-wrap hide'
                      }
                    >
                      {children}
                    </div>
                  )}
                  renderItem={(item, isHighlighted) => (
                    <div
                      data-testid="trainer-option"
                      className={
                        isHighlighted
                          ? 'autocomplete-dropdown-item active'
                          : 'autocomplete-dropdown-item '
                      }
                      key={item.id}
                    >
                      {item.fullName}
                    </div>
                  )}
                  value={trainerAutoCompleteTarget}
                  shouldItemRender={(item, value) =>
                    item.fullName.toLowerCase().indexOf(value.toLowerCase()) >
                    -1
                  }
                  onChange={(e) => setTrainerAutoCompleteTarget(e.target.value)}
                  onSelect={(value) => onHandleSelectTrainer(value)}
                />
              </CCol>
            </CRow>
            <FromAndToDate
              fromDate={editExistingEvent?.fromDate}
              endDate={editExistingEvent?.toDate}
            />
            <EventStartTimeEndTime
              onSelectStartAndEndTime={onSelectStartAndEndTime}
            />
            <CRow className="mt-1 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Subject:
                <span className={showIsRequired(editEvent?.agenda)}>*</span>
              </CFormLabel>
              <CCol sm={7}>
                <CFormTextarea
                  className="sh-agenda"
                  placeholder="Purpose"
                  data-testid="text-area"
                  aria-label="textarea"
                  value={editEvent?.agenda}
                  onChange={(e) => {
                    setEditEvent({
                      ...editEvent,
                      agenda: e.target.value.replace(/^\s*/, ''),
                    })
                  }}
                ></CFormTextarea>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-3">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Description:
                <span className={showIsRequired(editEvent?.description)}>
                  *
                </span>
              </CFormLabel>
              <CCol sm={8}>
                {showDescription ? (
                  <CKEditor<{
                    onChange: CKEditorEventHandler<'change'>
                  }>
                    initData={editEvent?.description}
                    config={ckeditorConfig}
                    debug={true}
                    onChange={({ editor }) => {
                      handleDescription(editor.getData().trim())
                    }}
                  />
                ) : (
                  <></>
                )}
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
                        projectAutoCompleteTarget &&
                        projectAutoCompleteTarget.length > 0
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
                  value={projectAutoCompleteTarget}
                  shouldItemRender={(item, itemValue) =>
                    item?.projectName
                      ?.toLowerCase()
                      .indexOf(itemValue?.toLowerCase()) > -1
                  }
                  onChange={(e) => projectsOnChangeHandler(e)}
                  onSelect={(selectedVal) =>
                    onHandleSelectProjectName(selectedVal)
                  }
                />
              </CCol>
            </CRow>
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
            <CRow className="row d-flex justify-content-center">
              {projectMembers?.length > 0 && isProjectChange && (
                <ProjectMembersSelectionForEvent
                  editEvent={editEvent}
                  projectMembers={projectMembers}
                  attendeeResponse={attendeesResponse}
                  setAttendeesResponse={setAttendeesResponse}
                  selectProjectMember={selectProjectMember}
                  isErrorShow={isErrorShow}
                  setIsErrorShow={setIsErrorShow}
                  setIsAttendeeErrorShow={setIsAttendeeErrorShow}
                  checkIsAttendeeExists={checkIsAttendeeExists}
                  deleteAttendeeId={deleteAttendeeId}
                />
              )}
              {attendeesResponse?.length > 0 ? (
                <EditEventAttendees
                  attendeeResponse={attendeesResponse}
                  setAttendeesResponse={setAttendeesResponse}
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
                    disabled={!isUpdateButtonEnabled}
                    onClick={handleConfirmBtn}
                  >
                    Update
                  </CButton>
                  <Link to={`/eventList`}>
                    <CButton
                      color="warning "
                      data-testid="clearBtn"
                      className="btn-ovh"
                    >
                      Cancel
                    </CButton>
                  </Link>
                </>
              </CCol>
            </CRow>
          </CForm>
        </CCol>
      </CRow>
    </OCard>
  )
}

export default EditEvent
