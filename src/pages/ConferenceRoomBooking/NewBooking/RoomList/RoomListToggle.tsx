import React, { useState } from 'react'
import { CFormSwitch } from '@coreui/react-pro'
import { getAllMeetingRooms } from '../../../../types/ConferenceRoomBooking/NewBooking/RoomList/roomListTypes'
import { useAppDispatch } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

const RoomListToggle = ({
  index,
  room,
}: {
  index: number
  room: getAllMeetingRooms
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isChecked, setIsChecked] = useState(room.roomStatus)

  const updatedToast = (
    <OToast toastColor="success" toastMessage="Room Updated Successfully" />
  )

  const handleUpdateRoom = async (updatedRoomObj: getAllMeetingRooms) => {
    await dispatch(reduxServices.roomLists.updateRoom(updatedRoomObj))
    dispatch(reduxServices.roomLists.getMeetingRooms())
    dispatch(reduxServices.app.actions.addToast(updatedToast))
    dispatch(reduxServices.app.actions.addToast(undefined))
  }

  const switchOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    const checkedCopy = checked
    setIsChecked(checkedCopy)
    const prepareObject = { ...room, roomStatus: checkedCopy }
    handleUpdateRoom(prepareObject)
  }

  return (
    <>
      <CFormSwitch
        className="sh-form-switch"
        data-testid={`btn-update${index}`}
        id="formSwitchCheckDefault"
        type="checkbox"
        name="roomStatus"
        size="lg"
        valid={true}
        checked={isChecked}
        onChange={(e) => switchOnChangeHandler(e)}
      />
    </>
  )
}

export default RoomListToggle
