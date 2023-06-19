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
import React, { useMemo, useState } from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import OModal from '../../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../../utils/paginationUtils'

const TrackerListTable = ({
  userDeleteAccess,
}: {
  userDeleteAccess: boolean
}): JSX.Element => {
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
      dispatch(reduxServices.app.actions.addToast(undefined))
      dispatch(reduxServices.ticketApprovals.getTrackerList())
    } else if (
      (reduxServices.addTrackerLists.deleteTrackerList.rejected.match(
        deleteTrackerResult,
      ) &&
        deleteTrackerResult.payload === 405) ||
      deleteTrackerResult.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteFailedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const pageFromState = useTypedSelector(
    reduxServices.addTrackerLists.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.addTrackerLists.selectors.pageSizeFromState,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(trackerList.length, pageSizeFromState, pageFromState)

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
    () => currentPageData(trackerList, currentPage, pageSize),
    [trackerList, currentPage, pageSize],
  )
  return (
    <>
      <CTable striped responsive className="mt-5 align-middle alignment">
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
          {currentPageItems?.length > 0 &&
            currentPageItems?.map((tracker, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>{tracker.name}</CTableDataCell>
                  <CTableDataCell className="text-middle ms-2">
                    <span className="hidden-block ms-3 sh-tracker-checkbox">
                      <CFormCheck
                        className="form-check-input form-select-not-allowed"
                        name="workflow"
                        checked={tracker.permission}
                        disabled={true}
                      />
                    </span>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {userDeleteAccess && (
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
            {trackerList?.length
              ? `Total Records: ${trackerList.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {trackerList?.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {trackerList?.length > 20 && (
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
        modalTitle="Delete Tracker"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={confirmDeleteTracker}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this <strong>{deleteTrackerName}</strong>{' '}
          Location ?
        </>
      </OModal>
    </>
  )
}
export default TrackerListTable
