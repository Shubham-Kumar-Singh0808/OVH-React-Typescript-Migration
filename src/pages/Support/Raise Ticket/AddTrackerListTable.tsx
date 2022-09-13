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
import React, { useEffect } from 'react'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const AddTrackerListTable = (): JSX.Element => {
  const trackerList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.trackerList,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.ticketApprovals.getTrackerList())
  }, [dispatch])

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

  const deleteTrackerButtonHandler = async (id: number) => {
    const isDeleteTracker = await dispatch(
      reduxServices.addTrackersLists.deleteTrackerList(id),
    )
    if (
      reduxServices.addTrackersLists.deleteTrackerList.fulfilled.match(
        isDeleteTracker,
      )
    ) {
      dispatch(reduxServices.ticketApprovals.getTrackerList())
      dispatch(reduxServices.app.actions.addToast(deleteSuccessToastMessage))
    } else if (
      (reduxServices.addTrackersLists.deleteTrackerList.rejected.match(
        isDeleteTracker,
      ) &&
        isDeleteTracker.payload === 405) ||
      isDeleteTracker.payload === 500
    ) {
      await dispatch(
        reduxServices.app.actions.addToast(deleteFailedToastMessage),
      )
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  return (
    <>
      <CTable striped responsive className="mt-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Approval</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {trackerList.map((tracker, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{tracker.name}</CTableDataCell>
                <CTableDataCell>
                  <CFormCheck
                    className="cursor-not-allowed"
                    name="workflow"
                    checked={tracker.permission}
                    disabled={true}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CTooltip content="Delete">
                    <CButton
                      data-testid={`btn-delete${index}`}
                      size="sm"
                      className="btn-ovh me-2 cursor-pointer"
                      color="danger btn-ovh me-2"
                      onClick={() => deleteTrackerButtonHandler(tracker.id)}
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
    </>
  )
}
export default AddTrackerListTable
