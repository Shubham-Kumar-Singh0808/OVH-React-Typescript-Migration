import { CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React from 'react'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { useTypedSelector } from '../../../../stateStore'

const NewBookingRoom = ({
  onHandleRoom,
  roomValue,
}: {
  onHandleRoom: (value: string) => void
  roomValue: number
}): JSX.Element => {
  const roomsOfLocation = useTypedSelector(
    (state) => state.bookingList.roomsOfLocation,
  )
  return (
    <>
      <CFormLabel className="col-sm-3 col-form-label text-end">
        Room :<span className={roomValue ? TextWhite : TextDanger}>*</span>
      </CFormLabel>
      <CCol sm={6}>
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
    </>
  )
}

export default NewBookingRoom
