import React, { useMemo, useState } from 'react'
import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import RoomListToggle from './RoomListToggle'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { currentPageData } from '../../../../utils/paginationUtils'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'

const RoomListTable = ({
  userDeleteAccess,
  selectLocationId,
}: {
  userDeleteAccess: boolean
  selectLocationId: string
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedRoomName, setSelectedRoomName] = useState('')
  const [deleteLocationId, setDeleteLocationId] = useState(0)

  const roomList = useTypedSelector(reduxServices.roomLists.selectors.roomNames)

  const pageFromState = useTypedSelector(
    reduxServices.roomLists.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.roomLists.selectors.pageSizeFromState,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(roomList?.length, pageSizeFromState, pageFromState)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(roomList, currentPage, pageSize),
    [roomList, currentPage, pageSize],
  )

  const deletedToastElement = (
    <OToast toastColor="success" toastMessage="Room Deleted Successfully" />
  )

  const deleteBtnHandler = (id: number, roomName: string) => {
    setIsDeleteModalVisible(true)
    setDeleteLocationId(id)
    setSelectedRoomName(roomName)
  }

  const deleteFailedToast = (
    <OToast
      toastMessage="Already meeting was booked in this room, so you cannot delete this room"
      toastColor="danger"
      data-testid="failedToast"
    />
  )

  const confirmDeleteRoom = async () => {
    setIsDeleteModalVisible(false)
    const deleteRoomResult = await dispatch(
      reduxServices.roomLists.deleteRoom(deleteLocationId),
    )
    if (reduxServices.roomLists.deleteRoom.fulfilled.match(deleteRoomResult)) {
      if (selectLocationId) {
        dispatch(
          reduxServices.roomLists.getRoomsOfLocation(Number(selectLocationId)),
        )
      } else {
        dispatch(reduxServices.roomLists.getMeetingRooms())
      }

      dispatch(reduxServices.app.actions.addToast(deletedToastElement))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.roomLists.deleteRoom.rejected.match(deleteRoomResult) &&
      deleteRoomResult.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteFailedToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }
  const tableHeaderToggleCell = {
    width: '9%',
    scope: 'col',
  }

  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">Room Name</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderToggleCell}>
              Status
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems &&
            currentPageItems?.length > 0 &&
            currentPageItems?.map((room, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>{room.locationName}</CTableDataCell>
                  <CTableDataCell>{room.roomName}</CTableDataCell>
                  <CTableDataCell>
                    <RoomListToggle index={index} room={room} />
                  </CTableDataCell>
                  <CTableDataCell>
                    {userDeleteAccess && (
                      <CTooltip content="Delete">
                        <CButton
                          data-testid={`btn-delete${index}`}
                          size="sm"
                          color="danger btn-ovh me-1"
                          className="btn-ovh-employee-list"
                          onClick={() =>
                            deleteBtnHandler(room.id, room.roomName)
                          }
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {roomList?.length
              ? `Total Records: ${roomList?.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {roomList?.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {roomList?.length > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Room"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={confirmDeleteRoom}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this <strong>{selectedRoomName}</strong>{' '}
          Location ?
        </>
      </OModal>
    </>
  )
}
export default RoomListTable
