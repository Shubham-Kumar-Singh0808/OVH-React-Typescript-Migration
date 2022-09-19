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

const RoomListTable = (): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isDeleteRoomName, setIsDeleteRoomName] = useState('')
  const [isDeleteLocationId, setIsDeleteLocationId] = useState(0)

  const roomList = useTypedSelector(reduxServices.roomLists.selectors.roomNames)
  const dispatch = useAppDispatch()

  const deletedToastElement = (
    <OToast toastColor="success" toastMessage="Room Deleted Successfully" />
  )

  const confirmDeleteRoom = async () => {
    setIsDeleteModalVisible(false)
    const isDeleteRoom = await dispatch(
      reduxServices.roomLists.deleteRoom(isDeleteLocationId),
    )
    if (reduxServices.roomLists.deleteRoom.fulfilled.match(isDeleteRoom)) {
      dispatch(reduxServices.roomLists.getAllMeetingRoomsData())
      dispatch(reduxServices.app.actions.addToast(deletedToastElement))
    }
  }

  const deleteBtnHandler = (id: number, roomName: string) => {
    setIsDeleteModalVisible(true)
    setIsDeleteLocationId(id)
    setIsDeleteRoomName(roomName)
  }

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
                      data-testid={`btn-update${index}`}
                      id="formSwitchCheckDefault"
                      type="radio"
                      size="xl"
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
          {`Do you really want to delete this ${isDeleteRoomName} Location ?`}
        </OModal>
      </CCol>
    </>
  )
}
export default RoomListTable
