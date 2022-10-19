import React, { useState, useEffect } from 'react'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import moment from 'moment'
import NewRoomReservedBy from './NewBookingChildComponets/NewRoomReservedBy'
import StartTimeEndTime from './NewBookingChildComponets/StartTimeEndTime'
import SelectProject from './NewBookingChildComponets/SelectProject'
import Attendees from './NewBookingChildComponets/Attendees'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { Author } from '../../../types/Dashboard/TrainingsAndEvents/trainingsAndEventsTypes'
import {
  AddRoom,
  Availability,
  GetAllProjectNames,
} from '../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import { commonDateFormat } from '../../../utils/dateFormatUtils'
import { showIsRequired } from '../../../utils/helper'
import OToast from '../../../components/ReusableComponent/OToast'

const NewBookingFilterOptions = (): JSX.Element => {
  const [location, setLocation] = useState<string>('1')
  const [selectProject, setSelectProject] = useState<GetAllProjectNames>()
  const authorDetails = {} as Author
  const employeesAvailability = {} as Availability[]
  const initEvent = {
    agenda: '',
    authorName: authorDetails,
    availability: employeesAvailability,
    conferenceType: '',
    employeeIds: [],
    endTime: '',
    fromDate: '',
    locationId: 0,
    projectName: '',
    roomId: '',
    startTime: '',
  } as AddRoom

  const [newRoomBooking, setNewRoomBooking] = useState(initEvent)
  const meetingLocation = useTypedSelector(
    (state) => state.bookingList.meetingLocation,
  )
  const roomsOfLocation = useTypedSelector(
    (state) => state.bookingList.roomsOfLocation,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.bookingList.getAllMeetingLocations())
    if (location) {
      dispatch(reduxServices.bookingList.getRoomsOfLocation(Number(location)))
    }
  }, [dispatch, location])

  const loggedEmployee = useTypedSelector(
    reduxServices.newBooking.selectors.LoggedEmployeeName,
  )

  const allEmployeesProfiles = useTypedSelector(
    reduxServices.newBooking.selectors.allEmployeesProfiles,
  )

  const onSelectAuthor = (value: Author) => {
    setNewRoomBooking({ ...newRoomBooking, authorName: value })
  }

  const fromDateChangeHandler = (value: Date) => {
    setNewRoomBooking({
      ...newRoomBooking,
      fromDate: moment(value).format(commonDateFormat),
    })
  }

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    setNewRoomBooking((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }
  const handleConfirmBooking = async () => {
    // const prepareObject = {
    //   agenda: newRoomBooking?.agenda,
    //   authorName: authorDetails,
    //   availability: employeesAvailability,
    //   conferenceType: 'Meeting',
    //   employeeIds: [],
    //   endTime: '',
    //   fromDate: '',
    //   locationId: location,
    //   projectName: selectProject,
    //   roomId: newRoomBooking?.roomId,
    //   startTime: '',
    // }
    const confirmNewBookingResultAction = await dispatch(
      reduxServices.newBooking.confirmNewMeetingAppointment({
        agenda: newRoomBooking?.agenda,
        authorName: authorDetails,
        availability: employeesAvailability as Availability[],
        conferenceType: 'Meeting',
        employeeIds: [],
        endTime: '',
        fromDate: '',
        locationId: location,
        projectName: selectProject as GetAllProjectNames,
        roomId: newRoomBooking?.roomId as string,
        startTime: '',
      }),
    )
    if (
      reduxServices.newBooking.confirmNewMeetingAppointment.fulfilled.match(
        confirmNewBookingResultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="            
            New room is booking"
          />,
        ),
      )
    }
  }
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Location:
          <span className={showIsRequired(location)}>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CFormSelect
            aria-label="location"
            id="location"
            data-testid="locationSelect"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value={''}>Select Location</option>
            {meetingLocation?.map((locationItem, index) => (
              <option key={index} value={locationItem.id}>
                {locationItem.locationName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Room:
          <span className={showIsRequired(newRoomBooking?.roomId)}>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CFormSelect
            aria-label="room"
            id="room"
            data-testid="locationSelect"
            name="room"
            value={newRoomBooking?.roomId}
            onChange={onChangeHandler}
          >
            <option value={''}>Select Room</option>
            {roomsOfLocation?.map((roomItem, index) => (
              <option key={index} value={roomItem.id}>
                {roomItem.roomName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <NewRoomReservedBy
        loggedEmployeeName={loggedEmployee.fullName}
        allEmployeesProfiles={allEmployeesProfiles}
        onSelectAuthor={onSelectAuthor}
        fromDateValue={newRoomBooking.fromDate}
        fromDateChangeHandler={fromDateChangeHandler}
      />
      <StartTimeEndTime />
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Subject:
          <span className={showIsRequired(newRoomBooking?.agenda)}>*</span>
        </CFormLabel>
        <CCol sm={5}>
          <CFormTextarea
            placeholder="Purpose"
            aria-label="textarea"
            id="agenda"
            name="agenda"
            value={newRoomBooking.agenda}
            onChange={onChangeHandler}
          ></CFormTextarea>
        </CCol>
      </CRow>
      <SelectProject setSelectProject={setSelectProject} />
      <Attendees
        loggedEmployeeName={loggedEmployee.fullName}
        allEmployeesProfiles={allEmployeesProfiles}
        onSelectAuthor={onSelectAuthor}
      />
      <CRow className="mt-5 mb-4">
        <CCol md={{ span: 6, offset: 2 }}>
          <>
            <CButton
              className="btn-ovh me-1"
              data-testid="confirmBtn"
              color="success"
              onClick={handleConfirmBooking}
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
