import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CFormSwitch,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { getAllMeetingRooms } from '../../../../types/ConferenceRoomBooking/NewBooking/RoomList/roomListTypes'

const RoomListTable = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedRoomName, setSelectedRoomName] = useState('')
  const [deleteLocationId, setDeleteLocationId] = useState(0)

  const initialRoomListDetails = {} as getAllMeetingRooms
  const [updateRoomDetails, setUpdateRoomDetails] = useState(
    initialRoomListDetails,
  )

  const roomList = useTypedSelector(reduxServices.roomLists.selectors.roomNames)

  const deletedToastElement = (
    <OToast toastColor="success" toastMessage="Room Deleted Successfully" />
  )

  const updatedToast = (
    <OToast toastColor="success" toastMessage="Room Updated Successfully" />
  )

  const switchOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    room: getAllMeetingRooms,
    index: number,
  ) => {
    const { checked } = e.target
    const mappedRoomCopy = { ...room }
    let toEdit = null
    toEdit = { ...mappedRoomCopy, ...{ roomStatus: checked } }
    setUpdateRoomDetails(toEdit)
    console.log(updateRoomDetails)
  }

  const confirmDeleteRoom = async () => {
    setIsDeleteModalVisible(false)
    const isDeleteRoom = await dispatch(
      reduxServices.roomLists.deleteRoom(deleteLocationId),
    )
    if (reduxServices.roomLists.deleteRoom.fulfilled.match(isDeleteRoom)) {
      dispatch(reduxServices.roomLists.getMeetingRooms())
      dispatch(reduxServices.app.actions.addToast(deletedToastElement))
    }
  }

  const deleteBtnHandler = (id: number, roomName: string) => {
    setIsDeleteModalVisible(true)
    setDeleteLocationId(id)
    setSelectedRoomName(roomName)
  }

  const handleUpdateRoom = async (room: getAllMeetingRooms) => {
    // console.log(room)
    const prepareObject = {
      ...room,
      ...{ roomStatus: updateRoomDetails.roomStatus },
    }
    // console.log(prepareObject)
    const updatingRoom = await dispatch(
      reduxServices.roomLists.updateRoom(updateRoomDetails),
    )
    if (reduxServices.roomLists.updateRoom.fulfilled.match(updatingRoom)) {
      dispatch(reduxServices.roomLists.getMeetingRooms())
      dispatch(reduxServices.app.actions.addToast(updatedToast))
    }
  }
  // console.log(roomStatus)

  return (
    <>
      <CCol className="custom-scroll">
        <CTable striped responsive className="mt-5">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Location</CTableHeaderCell>
              <CTableHeaderCell scope="col">Room Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {roomList.map((room, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{room.locationName}</CTableDataCell>
                  <CTableDataCell>{room.roomName}</CTableDataCell>
                  <CTableDataCell>
                    <CFormSwitch
                      className="sh-form-switch"
                      data-testid={`btn-update${index}`}
                      id="formSwitchCheckDefault"
                      type="checkbox"
                      name="roomStatus"
                      size="lg"
                      valid={true}
                      checked={
                        updateRoomDetails.id && updateRoomDetails.id === room.id
                          ? updateRoomDetails.roomStatus
                          : room.roomStatus
                      }
                      onChange={(e) => switchOnChangeHandler(e, room, index)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="Delete">
                      <CButton
                        data-testid={`btn-delete${index}`}
                        size="sm"
                        className="btn-ovh me-2 cursor-pointer"
                        color="danger btn-ovh me-2"
                        onClick={() =>
                          deleteBtnHandler(room.locationId, room.roomName)
                        }
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </CCol>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {roomList.length}</strong>
          </p>
        </CCol>
      </CRow>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={confirmDeleteRoom}
      >
        {`Do you really want to delete this ${selectedRoomName} Location ?`}
      </OModal>
    </>
  )
}
export default RoomListTable
