import { CRow, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const BookingListFilterOptions = (): JSX.Element => {
  const [location, setLocation] = useState<string>('')
  const [room, setRoom] = useState<string>('')
  const dispatch = useAppDispatch()

  const meetingLocation = useTypedSelector(
    (state) => state.bookingList.meetingLocation,
  )
  const roomsOfLocation = useTypedSelector(
    (state) => state.bookingList.roomsOfLocation,
  )

  useEffect(() => {
    dispatch(reduxServices.bookingList.getAllMeetingLocations())
    if (location) {
      dispatch(reduxServices.bookingList.getRoomsOfLocation(Number(location)))
    }
  }, [dispatch, location])

  return (
    <>
      <CRow className="employeeAllocation-form">
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Location:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="location"
            data-testid="form-select1"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
            }}
          >
            <option value={''}>Select</option>
            {meetingLocation?.map((location, index) => (
              <option key={index} value={location.id}>
                {location.locationName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Room:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="billingStatus"
            data-testid="form-select2"
            name="billingStatus"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value)
            }}
          >
            <option value={''}>Select Room</option>
            {roomsOfLocation?.map((room, index) => (
              <option key={index} value={room.id}>
                {room.roomName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Meeting Status:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="billingStatus"
            data-testid="form-select2"
            name="billingStatus"
          >
            <option value="All" selected>
              New
            </option>
            <option value="true">In Progress</option>
            <option value="false">Cancelled</option>
            <option value="onBench">Completed</option>
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Select:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="technology"
            data-testid="form-select1"
            name="technology"
          >
            <option value="Today">Today</option>
            <option value="Custom">Custom</option>
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default BookingListFilterOptions
