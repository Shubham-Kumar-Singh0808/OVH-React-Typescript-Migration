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
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  EditMeetingRequest,
  MeetingEditDTOList,
} from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import { Author } from '../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import { showIsRequired } from '../../../utils/helper'
import NewBookingLocation from '../NewBooking/NewBookingChildComponents/NewBookingLocation'
import NewBookingRoom from '../NewBooking/NewBookingChildComponents/NewBookingRoom'
import {
  EventFromDate,
  SelectProject,
  StartTimeEndTime,
} from '../NewEvent/NewEventChildComponents'

const EditBookingFilterOptions = (): JSX.Element => {
  const editExistingMeetingRequest = useTypedSelector(
    reduxServices.bookingList.selectors.editExistingMeetingRequest,
  )
  const [isProjectAndAttendeesEnable, setIsProjectAndAttendeesEnable] =
    useState(true)
  const allProjects = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )
  const authorDetails = {} as Author
  const meetingEditDTOList = {} as MeetingEditDTOList[]
  const dateFormat = 'DD/MM/YYYY'
  const initNewBooking = {
    id: 0,
    agenda: '',
    roomId: 0,
    roomName: '',
    locationName: '',
    fromDate: '',
    toDate: null,
    startTime: '',
    endTime: '',
    projectName: '',
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
    availability: null,
    meetingStatus: null,
    conferenceType: '',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: null,
    eventId: null,
    description: null,
    eventEditAccess: null,
    empDesignations: null,
    employeeDto: null,
    trainerName: null,
    availableDates: '',
  } as EditMeetingRequest
  const dispatch = useAppDispatch()
  const [projectName, setProjectName] = useState<string>('')
  const [editMeetingRequest, setEditMeetingRequest] = useState(initNewBooking)
  useEffect(() => {
    if (editExistingMeetingRequest != null) {
      setEditMeetingRequest(editExistingMeetingRequest)
    }
  }, [editExistingMeetingRequest])

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

  const onSelectProject = (value: string) => {
    setEditMeetingRequest({ ...editMeetingRequest, projectName: value })
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
            <SelectProject
              allProjects={allProjects}
              onSelectProject={onSelectProject}
              isProjectAndAttendeesEnable={isProjectAndAttendeesEnable}
            />
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
