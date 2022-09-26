import React, { useState, useEffect } from 'react'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import NewRoomReservedBy from './NewBookingChildComponets/NewRoomReservedBy'
import StartTimeEndTime from './NewBookingChildComponets/StartTimeEndTime'
import SelectProject from './NewBookingChildComponets/SelectProject'
import Attendees from './NewBookingChildComponets/Attendees'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const NewBookingFilterOptions = (): JSX.Element => {
  const [location, setLocation] = useState<string>('1')
  const [room, setRoom] = useState<string>('')
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
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Location:
          <span>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CFormSelect
            aria-label="location"
            id="location"
            data-testid="locationSelect"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
            }}
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
          <span>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CFormSelect
            aria-label="room"
            id="room"
            data-testid="locationSelect"
            name="room"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value)
            }}
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
      <NewRoomReservedBy />
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
    </>
  )
}

export default NewBookingFilterOptions
