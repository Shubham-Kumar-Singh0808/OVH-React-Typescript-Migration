import React, { useState, useEffect } from 'react'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import NewRoomReservedBy from './NewBookingChildComponets/NewRoomReservedBy'
import StartTimeEndTime from './NewBookingChildComponets/StartTimeEndTime'
import SelectProject from './NewBookingChildComponets/SelectProject'
import Attendees from './NewBookingChildComponets/Attendees'
import LocationAndRoom from './NewBookingChildComponets/LocationAndRoom'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { Author } from '../../../types/Dashboard/TrainingsAndEvents/trainingsAndEventsTypes'
import {
  AddRoom,
  Availability,
  GetAllProjectNames,
} from '../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import { showIsRequired } from '../../../utils/helper'

const NewBookingFilterOptions = (): JSX.Element => {
  const [selectProject, setSelectProject] = useState<GetAllProjectNames>()
  const [fromDate, setFromDate] = useState<string>(
    new Date() as unknown as string,
  )
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
    locationId: 1,
    projectName: '',
    roomId: 0,
    startTime: '',
  } as AddRoom
  console.log(selectProject)
  const [newRoomBooking, setNewRoomBooking] = useState(initEvent)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.bookingList.getAllMeetingLocations())
    if (newRoomBooking.locationId) {
      dispatch(
        reduxServices.bookingList.getRoomsOfLocation(
          Number(newRoomBooking.locationId),
        ),
      )
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

  useEffect(() => {
    dispatch(reduxServices.newBooking.getLoggedEmployeeName())
  }, [dispatch])

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

  const onHandleLocation = (value: string) => {
    setNewRoomBooking({ ...newRoomBooking, locationId: Number(value) })
  }

  const onHandleRoom = (value: string) => {
    setNewRoomBooking({ ...newRoomBooking, roomId: Number(value) })
  }
  const onHandleStartTime = (value: string) => {
    setNewRoomBooking({ ...newRoomBooking, startTime: value })
  }
  const onHandleEndTime = (value: string) => {
    setNewRoomBooking({ ...newRoomBooking, endTime: value })
  }
  return (
    <>
      <LocationAndRoom
        onHandleLocation={onHandleLocation}
        onHandleRoom={onHandleRoom}
        // locationRooms={locationRooms}
        locationValue={newRoomBooking.locationId}
        roomValue={newRoomBooking.roomId}
      />
      <NewRoomReservedBy
        loggedEmployeeName={loggedEmployee.fullName}
        allEmployeesProfiles={allEmployeesProfiles}
        onSelectAuthor={onSelectAuthor}
        fromDate={fromDate}
        setFromDate={setFromDate}
      />
      <StartTimeEndTime
        onHandleStartTime={onHandleStartTime}
        onHandleEndTime={onHandleEndTime}
        startTimeValue={newRoomBooking.startTime}
        endTimeValue={newRoomBooking.endTime}
      />
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
              // onClick={handleConfirmBooking}
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
