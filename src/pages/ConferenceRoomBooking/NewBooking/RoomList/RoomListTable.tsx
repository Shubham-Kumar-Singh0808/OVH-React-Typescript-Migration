import React, { useEffect } from 'react'
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

const RoomListTable = (): JSX.Element => {
  const roomList = useTypedSelector(reduxServices.roomLists.selectors.roomNames)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.roomLists.getAllMeetingRoomsData())
  }, [dispatch])
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
                      data-testid={`btn-delete${index}`}
                      id="formSwitchCheckDefault"
                      type="radio"
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="Delete">
                      <CButton
                        data-testid={`btn-delete${index}`}
                        size="sm"
                        className="btn-ovh me-2 cursor-pointer"
                        color="danger btn-ovh me-2"
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
      </CCol>
    </>
  )
}
export default RoomListTable
