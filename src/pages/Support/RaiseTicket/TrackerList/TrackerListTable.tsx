import {
  CButton,
  CCol,
  CFormCheck,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import OModal from '../../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const TrackerListTable = (): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteTrackerName, setDeleteTrackerName] = useState('')
  const [deleteTrackerId, setDeleteTrackerId] = useState(0)
  const dispatch = useAppDispatch()

  const trackerList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.trackerList,
  )

  const deleteSuccessToastMessage = (
    <OToast toastMessage="Tracker Deleted Successfully" toastColor="success" />
  )

  const deleteFailedToastMessage = (
    <OToast
      toastMessage="This tracker is already used in tickets, So you cannot delete"
      toastColor="danger"
      data-testid="failedToast"
    />
  )
  const deleteTrackerButtonHandler = (id: number, roomName: string) => {
    setIsDeleteModalVisible(true)
    setDeleteTrackerId(id)
    setDeleteTrackerName(roomName)
  }
  const confirmDeleteTracker = async () => {
    setIsDeleteModalVisible(false)
    const deleteTrackerResult = await dispatch(
      reduxServices.addTrackerLists.deleteTrackerList(deleteTrackerId),
    )
    if (
      reduxServices.addTrackerLists.deleteTrackerList.fulfilled.match(
        deleteTrackerResult,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteSuccessToastMessage))
      dispatch(reduxServices.ticketApprovals.getTrackerList())
    } else if (
      (reduxServices.addTrackerLists.deleteTrackerList.rejected.match(
        deleteTrackerResult,
      ) &&
        deleteTrackerResult.payload === 405) ||
      deleteTrackerResult.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteFailedToastMessage))
    }
  }
  return (
    <>
      <CTable striped responsive className="mt-5 align-middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-middle">
              Approval
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-center">
              Actions
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {trackerList &&
            trackerList?.map((tracker, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{tracker.name}</CTableDataCell>
                  <CTableDataCell className="text-middle ms-2">
                    <span className="hidden-block ms-3">
                      <CFormCheck
                        className="form-check-input form-select-not-allowed "
                        name="workflow"
                        checked={tracker.permission}
                        disabled={true}
                      />
                    </span>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CTooltip content="Delete">
                      <CButton
                        data-testid={`btn-delete${index}`}
                        size="sm"
                        color="danger btn-ovh me-1"
                        className="btn-ovh-employee-list"
                        onClick={() =>
                          deleteTrackerButtonHandler(tracker.id, tracker.name)
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
            <strong>Total Records: {trackerList.length}</strong>
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
        confirmButtonAction={confirmDeleteTracker}
      >
        {`Do you really want to delete this ${deleteTrackerName} Location ?`}
      </OModal>
    </>
  )
}
export default TrackerListTable
