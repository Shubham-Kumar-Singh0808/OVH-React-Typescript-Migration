import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { useTypedSelector } from '../../../../stateStore'

const LocationAndRoom = ({
  onHandleLocation,
  onHandleRoom,
  //   locationRooms,
  locationValue,
  roomValue,
}: {
  onHandleLocation: (value: string) => void
  onHandleRoom: (value: string) => void
  //   locationRooms: RoomsByLocation[]
  locationValue: number
  roomValue: number
}): JSX.Element => {
  const meetingLocation = useTypedSelector(
    (state) => state.bookingList.meetingLocation,
  )
  const roomsOfLocation = useTypedSelector(
    (state) => state.bookingList.roomsOfLocation,
  )
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Location:
          <span className={locationValue ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={4}>
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
            {meetingLocation?.map((location, locationIndex) => (
              <option key={locationIndex} value={location.id}>
                {location.locationName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Room:
          <span className={roomValue ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CFormSelect
            aria-label="room"
            id="room"
            data-testid="roomSelect"
            name="roomId"
            value={roomValue}
            onChange={(e) => {
              onHandleRoom(e.target.value)
            }}
          >
            <option value={''}>Select Room</option>
            {roomsOfLocation?.map((room, roomIndex) => (
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

export default LocationAndRoom
