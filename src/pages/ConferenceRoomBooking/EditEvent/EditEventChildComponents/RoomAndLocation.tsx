import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React from 'react'
import { getAllMeetingLocations } from '../../../../types/ConferenceRoomBooking/NewBooking/LocationList/locationListTypes'
import { RoomsByLocation } from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const RoomAndLocation = ({
  locationValue,
  roomValue,
  eventLocations,
  locationRooms,
}: {
  eventLocations: getAllMeetingLocations[]

  locationRooms: RoomsByLocation[]
  locationValue: number
  roomValue: number
}): JSX.Element => {
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Location:
        </CFormLabel>
        <CCol sm={6}>
          <CFormSelect
            aria-label="location"
            id="location"
            data-testid="locationSelect"
            name="locationId"
            value={locationValue}
            disabled
          >
            <option value={''}>Select Location</option>
            {eventLocations?.map((location, locationIndex) => (
              <option key={locationIndex} value={location.id}>
                {location.locationName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Room:
        </CFormLabel>
        <CCol sm={6}>
          <CFormSelect
            aria-label="room"
            id="room"
            data-testid="roomSelect"
            name="roomId"
            value={roomValue}
            disabled
          >
            <option value={''}>Select Room</option>
            {locationRooms?.map((room, roomIndex) => (
              <option key={roomIndex} value={room.id}>
                {room.roomName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default RoomAndLocation
