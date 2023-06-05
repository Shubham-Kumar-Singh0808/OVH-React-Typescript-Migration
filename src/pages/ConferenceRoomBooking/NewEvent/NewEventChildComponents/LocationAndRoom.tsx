import {
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormCheck,
  CFormInput,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { getAllMeetingLocations } from '../../../../types/ConferenceRoomBooking/NewBooking/LocationList/locationListTypes'
import { RoomsByLocation } from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const LocationAndRoom = ({
  eventLocations,
  onHandleLocation,
  onHandleRoom,
  locationRooms,
  locationValue,
  roomValue,
}: {
  eventLocations: getAllMeetingLocations[]
  onHandleLocation: (value: string) => void
  onHandleRoom: (value: string) => void
  locationRooms: RoomsByLocation[]
  locationValue: number
  roomValue: number | boolean
}): JSX.Element => {
  const [otherPlaceShown, setOtherPlaceShown] = useState(false)
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Location :
          <span className={locationValue ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={6}>
          <CFormSelect
            aria-label="location"
            id="location"
            data-testid="locationSelect"
            name="locationId"
            value={locationValue}
            onChange={(e) => {
              onHandleLocation(e.target.value)
            }}
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
        <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
          Room :
        </CFormLabel>
        <CCol sm={6}>
          <CFormSelect
            className={otherPlaceShown ? 'form-select-not-allowed' : ''}
            aria-label="room"
            id="room"
            data-testid="roomSelect"
            name="roomId"
            value={roomValue as number}
            disabled={otherPlaceShown}
            onChange={(e) => {
              onHandleRoom(e.target.value)
            }}
          >
            <option value={''}>Select Room</option>
            {locationRooms?.map((room, roomIndex) => (
              <option key={roomIndex} value={room.id}>
                {room.roomName}
              </option>
            ))}
          </CFormSelect>
          <CFormCheck
            className="mt-4 fw-bold"
            id="trigger"
            label="Other Place"
            checked={otherPlaceShown}
            onChange={() => setOtherPlaceShown(!otherPlaceShown)}
            disabled={roomValue as boolean}
          />
        </CCol>
      </CRow>
      {otherPlaceShown && (
        <CRow className="mt-1 mb-3">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CFormInput
              type="text"
              data-testid="placeInput"
              id="place"
              placeholder="Place"
              name="place"
            />
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default LocationAndRoom
