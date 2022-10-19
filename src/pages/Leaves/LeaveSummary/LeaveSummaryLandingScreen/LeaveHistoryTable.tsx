import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CLink,
  CButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import { reduxServices } from '../../../../reducers/reduxServices'
import { LeaveHistoryTableProps } from '../../../../types/Leaves/LeaveSummary/employeeLeaveSummaryTypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import OModal from '../../../../components/ReusableComponent/OModal'

const LeaveHistoryTable = (props: LeaveHistoryTableProps): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [comments, setComments] = useState<string>('')
  const [leaveId, setLeaveId] = useState(0)
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  const employeeLeaveHistoryDetails = useTypedSelector(
    reduxServices.employeeLeaveSummary.selectors.employeeLeaveHistory,
  )

  const leaveHistoryListSize = useTypedSelector(
    reduxServices.employeeLeaveSummary.selectors.listSize,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleModal = (leaveComments: string) => {
    setIsModalVisible(true)
    setComments(leaveComments)
  }

  const handleShowCancelModal = (leaveID: number) => {
    setLeaveId(leaveID)
    setIsCancelModalVisible(true)
  }

  const dispatch = useAppDispatch()

  const handleCancelLeave = async () => {
    setIsCancelModalVisible(false)
    const cancelLeaveResultAction = await dispatch(
      reduxServices.employeeLeaveSummary.cancelEmployeeLeave(leaveId),
    )
    if (
      reduxServices.employeeLeaveSummary.cancelEmployeeLeave.fulfilled.match(
        cancelLeaveResultAction,
      )
    ) {
      dispatch(
        reduxServices.employeeLeaveSummary.getEmployeeLeaveHistory({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
        }),
      )
    }
  }
  const leaveStatusLabelColor = (leaveStatus: string): JSX.Element => {
    if (leaveStatus === 'PendingApproval') {
      return (
        <span className="profile-tab-label label-info">
          {'Pending Approval'}
        </span>
      )
    } else if (leaveStatus === 'Cancelled') {
      return (
        <span className="profile-tab-label label-gray-cancel">
          {leaveStatus}
        </span>
      )
    } else if (leaveStatus === 'Approved') {
      return (
        <span className="profile-tab-label label-success">{leaveStatus}</span>
      )
    } else if (leaveStatus === 'Rejected') {
      return (
        <span className="profile-tab-label label-danger">{leaveStatus}</span>
      )
    } else if (leaveStatus === 'CancelAfterApproval') {
      return (
        <span className="profile-tab-label label-gray-cancelAfterApproval">
          {leaveStatus}
        </span>
      )
    }
    return <></>
  }

  return (
    <>
      {employeeLeaveHistoryDetails?.length ? (
        <>
          <CTable striped className="text-center" align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">From Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">To Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Days</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Comments</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Manager Comments
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Approved By</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {employeeLeaveHistoryDetails.map((leaveHistory, index) => {
                const employeeCommentsLimit =
                  leaveHistory.employeeComments &&
                  leaveHistory.employeeComments.length > 30
                    ? `${leaveHistory.employeeComments.substring(0, 30)}...`
                    : leaveHistory.employeeComments

                const mgrCommentsLimit =
                  leaveHistory.managerComments &&
                  leaveHistory.managerComments.length > 30
                    ? `${leaveHistory.managerComments.substring(0, 30)}...`
                    : leaveHistory.managerComments
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row">
                      {leaveHistory.from}
                    </CTableDataCell>
                    <CTableDataCell>{leaveHistory.to}</CTableDataCell>
                    <CTableDataCell>{leaveHistory.numberOfDays}</CTableDataCell>
                    <CTableDataCell>
                      {leaveHistory.leaveCategoryDTO.name}
                    </CTableDataCell>
                    {employeeCommentsLimit ? (
                      <CTableDataCell
                        scope="row"
                        className="sh-organization-link"
                      >
                        <CLink
                          className="cursor-pointer text-primary"
                          data-testid={`emp-comments${index}`}
                          onClick={() =>
                            handleModal(leaveHistory.employeeComments)
                          }
                        >
                          {parse(employeeCommentsLimit)}
                        </CLink>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell>{`N/A`}</CTableDataCell>
                    )}

                    {mgrCommentsLimit ? (
                      <CTableDataCell
                        scope="row"
                        className="sh-organization-link"
                      >
                        <CLink
                          className="cursor-pointer text-primary"
                          data-testid={`mgr-comments${index}`}
                          onClick={() =>
                            handleModal(leaveHistory.managerComments)
                          }
                        >
                          {parse(mgrCommentsLimit)}
                        </CLink>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell>{`N/A`}</CTableDataCell>
                    )}
                    <CTableDataCell scope="row">
                      {leaveStatusLabelColor(leaveHistory.status)}
                    </CTableDataCell>
                    <CTableDataCell>{leaveHistory.approvedBy}</CTableDataCell>
                    <CTableDataCell>
                      {leaveHistory.status === 'PendingApproval' ? (
                        <CButton
                          color="warning"
                          size="sm"
                          className="btn-ovh btn-ovh-employee-list"
                          data-testid={`cancel-btn${index}`}
                          onClick={() => handleShowCancelModal(leaveHistory.id)}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </CButton>
                      ) : (
                        <></>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {leaveHistoryListSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {leaveHistoryListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {leaveHistoryListSize > 20 && (
              <CCol
                xs={5}
                className="gap-1 d-grid d-md-flex justify-content-md-end"
              >
                <OPagination
                  currentPage={currentPage}
                  pageSetter={setCurrentPage}
                  paginationRange={paginationRange}
                />
              </CCol>
            )}
          </CRow>
        </>
      ) : (
        <CCol>
          <CRow>
            <h4 className="text-center">No data to display</h4>
          </CRow>
        </CCol>
      )}
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        <p>
          <div
            dangerouslySetInnerHTML={{
              __html: comments,
            }}
          />
        </p>
      </OModal>
      <OModal
        visible={isCancelModalVisible}
        setVisible={setIsCancelModalVisible}
        modalTitle="Cancel Leave"
        modalBodyClass="mt-0"
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleCancelLeave}
      >
        <>Would you like to Cancel the leave ?</>
      </OModal>
    </>
  )
}

export default LeaveHistoryTable
