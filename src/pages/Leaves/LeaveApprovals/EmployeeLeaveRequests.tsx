import {
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCol,
  CLink,
  CBadge,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'

const EmployeeLeaveRequests = (props: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isCommentsModalVisibility, setIsCommentsModalVisibility] =
    useState<boolean>(false)
  const [isApproveModalVisibility, setIsApproveModalVisibility] =
    useState<boolean>(false)
  const [isRejectModalVisibility, setIsRejectModalVisibility] =
    useState<boolean>(false)
  const [isCancelAfterApprovalVisibility, setIsCancelAfterApprovalVisibility] =
    useState<boolean>(false)
  const [isManagerCheckModal, setIsManagerCheckModal] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')
  const [isManagerCheckText, setIsManagerCheckText] = useState<string>('')
  const [selectLeaveId, setSelectLeaveId] = useState<number>(0)
  const [approveLeaveComment, setApproveLeaveComment] = useState<string>('')

  const employeesLeavesList = useTypedSelector(
    reduxServices.leaveApprovals.selectors.allEmployeesLeavesList,
  )

  const isLoading = useTypedSelector(
    reduxServices.leaveApprovals.selectors.isLoading,
  )

  const employeesLeavesListSize = useTypedSelector(
    reduxServices.leaveApprovals.selectors.listSize,
  )

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
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

  const handleModal = (displayText: string) => {
    setIsCommentsModalVisibility(true)
    setModalText(displayText)
  }

  const leaveRequestsStatusLabelColor = (statusValue: string): JSX.Element => {
    if (statusValue === 'PendingApproval') {
      return (
        <CBadge className="rounded-pill label-info">
          {'Pending Approval'}
        </CBadge>
      )
    } else if (statusValue === 'Cancelled') {
      return (
        <CBadge className="rounded-pill label-gray-cancel">
          {statusValue}
        </CBadge>
      )
    } else if (statusValue === 'Approved') {
      return (
        <CBadge className="rounded-pill label-success">{statusValue}</CBadge>
      )
    } else if (statusValue === 'Rejected') {
      return (
        <CBadge className="rounded-pill label-danger">{statusValue}</CBadge>
      )
    } else if (statusValue === 'CancelAfterApproval') {
      return (
        <CBadge className="rounded-pill label-gray-cancelAfterApproval">
          {statusValue}
        </CBadge>
      )
    }
    return <></>
  }

  const handleApproveModal = async (leaveId: number) => {
    setSelectLeaveId(leaveId)
    const resultAction = await dispatch(
      reduxServices.leaveApprovals.checkProjectManagerExists(leaveId),
    )
    if (
      reduxServices.leaveApprovals.checkProjectManagerExists.fulfilled.match(
        resultAction,
      ) &&
      resultAction.payload === false
    ) {
      setIsApproveModalVisibility(true)
    } else {
      setIsManagerCheckModal(true)
      setIsManagerCheckText(
        `Sorry! You can't approve this leave(s), please communicate with respective project manager.`,
      )
    }
  }

  const handleRejectModal = async (leaveId: number) => {
    setSelectLeaveId(leaveId)
    const resultAction = await dispatch(
      reduxServices.leaveApprovals.checkProjectManagerExists(leaveId),
    )
    if (
      reduxServices.leaveApprovals.checkProjectManagerExists.fulfilled.match(
        resultAction,
      ) &&
      resultAction.payload === false
    ) {
      setIsRejectModalVisibility(true)
    } else {
      setIsManagerCheckModal(true)
      setIsManagerCheckText(
        `Sorry! You can't reject this leave(s), please communicate with respective project manager.`,
      )
    }
  }

  const leaveRejectToastElement = (
    <OToast
      toastColor="danger"
      toastMessage="Leave already cancelled,so cannot Reject/you are not authorized to reject leave."
    />
  )

  const handleApproveLeave = async () => {
    setIsApproveModalVisibility(false)
    const leaveApproveResultAction = await dispatch(
      reduxServices.leaveApprovals.leaveApprove({
        leaveId: selectLeaveId,
        comments: approveLeaveComment,
      }),
    )
    if (
      reduxServices.leaveApprovals.leaveApprove.fulfilled.match(
        leaveApproveResultAction,
      )
    ) {
      dispatch(
        reduxServices.leaveApprovals.getEmployeeLeaves({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          managerId: Number(employeeId),
        }),
      )
    }
  }

  const handleRejectLeave = async () => {
    setIsRejectModalVisibility(false)
    const leaveRejectResultAction = await dispatch(
      reduxServices.leaveApprovals.leaveReject({
        leaveId: selectLeaveId,
      }),
    )
    if (
      reduxServices.leaveApprovals.leaveReject.fulfilled.match(
        leaveRejectResultAction,
      )
    ) {
      dispatch(
        reduxServices.leaveApprovals.getEmployeeLeaves({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          managerId: Number(employeeId),
        }),
      )
    } else if (
      reduxServices.leaveApprovals.leaveApprove.rejected.match(
        leaveRejectResultAction,
      ) &&
      leaveRejectResultAction.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(leaveRejectToastElement))
    }
  }
  const handleCancelAfterApprovalLeave = async () => {
    dispatch(
      reduxServices.leaveApprovals.checkProjectManagerExists(selectLeaveId),
    )
    setIsCancelAfterApprovalVisibility(false)
    const cancelAfterApprovalResultAction = await dispatch(
      reduxServices.leaveApprovals.leaveReject({
        leaveId: selectLeaveId,
      }),
    )
    if (
      reduxServices.leaveApprovals.leaveReject.fulfilled.match(
        cancelAfterApprovalResultAction,
      )
    ) {
      dispatch(
        reduxServices.leaveApprovals.getEmployeeLeaves({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          managerId: Number(employeeId),
        }),
      )
    }
  }
  const tableHeaderCellPropsAction = {
    width: '12%',
    scope: 'col',
  }

  return (
    <>
      <CRow className="sh-leave-approvals-table">
        <CTable striped responsive className="align-middle text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Applied On</CTableHeaderCell>
              <CTableHeaderCell>From</CTableHeaderCell>
              <CTableHeaderCell>To</CTableHeaderCell>
              <CTableHeaderCell>Days</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Comments</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Approved By</CTableHeaderCell>
              <CTableHeaderCell {...tableHeaderCellPropsAction}>
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          {isLoading !== ApiLoadingState.loading ? (
            <CTableBody>
              {employeesLeavesList?.map((employeeLeaveItem, index) => {
                const removeTag = '/(<([^>]+)>)/gi'
                const removeSpaces =
                  employeeLeaveItem.employeeComments &&
                  employeeLeaveItem.employeeComments
                    .replace(/\s+/g, ' ')
                    .trim()
                    .replace(/&nbsp;/g, '')
                    .replace(removeTag, '')
                const employeeCommentsLimit =
                  removeSpaces && removeSpaces.length > 30
                    ? `${removeSpaces.substring(0, 30)}...`
                    : removeSpaces
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      {employeeLeaveItem.employeeDTO.fullName}
                    </CTableDataCell>
                    <CTableDataCell>
                      {employeeLeaveItem.appliedDate}
                    </CTableDataCell>
                    <CTableDataCell>{employeeLeaveItem.from}</CTableDataCell>
                    <CTableDataCell>{employeeLeaveItem.to}</CTableDataCell>
                    <CTableDataCell>
                      {employeeLeaveItem.numberOfDays}
                    </CTableDataCell>
                    <CTableDataCell>
                      {employeeLeaveItem.leaveCategoryDTO.name}
                    </CTableDataCell>
                    <CTableDataCell className="sh-leave-approval-link">
                      {employeeCommentsLimit ? (
                        <CLink
                          className="cursor-pointer"
                          data-testid="employee-comment-Link"
                          onClick={() =>
                            handleModal(employeeLeaveItem.employeeComments)
                          }
                        >
                          <span className="descriptionField">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: employeeCommentsLimit,
                              }}
                            />
                          </span>
                        </CLink>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {leaveRequestsStatusLabelColor(employeeLeaveItem.status)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {employeeLeaveItem.approvedBy}
                    </CTableDataCell>
                    <CTableDataCell>
                      {employeeLeaveItem.status === 'PendingApproval' ? (
                        <>
                          <CButton
                            color="success btn-ovh me-1"
                            data-testid="approve-btn"
                            className="btn-ovh-employee-list"
                            onClick={() => {
                              handleApproveModal(employeeLeaveItem.id)
                            }}
                          >
                            <i
                              className="fa fa-check-circle-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                          <CButton
                            color="danger btn-ovh me-1"
                            data-testid="reject-btn"
                            className="btn-ovh-employee-list"
                            onClick={() => {
                              handleRejectModal(employeeLeaveItem.id)
                            }}
                          >
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </CButton>
                        </>
                      ) : (
                        <></>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          ) : (
            <>
              <OLoadingSpinner type={LoadingType.PAGE} />
            </>
          )}
        </CTable>
        {employeesLeavesList && isLoading !== ApiLoadingState.loading && (
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>
                  {employeesLeavesList?.length
                    ? `Total Records: ${employeesLeavesListSize}`
                    : `No Records found...`}
                </strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {employeesLeavesListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80, 100]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {employeesLeavesListSize > 20 && (
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
        )}
      </CRow>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isCommentsModalVisibility}
        setVisible={setIsCommentsModalVisibility}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <p>
          <span className="descriptionField">
            <div
              dangerouslySetInnerHTML={{
                __html: modalText,
              }}
            />
          </span>
        </p>
      </OModal>
      <OModal
        alignment="center"
        visible={isApproveModalVisibility}
        setVisible={setIsApproveModalVisibility}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={handleApproveLeave}
      >
        <>
          <h4 className="sh-accept-leave-h4">Accept Leave</h4>
          <CRow className="mt-5 mb-5">
            <CFormLabel className=" ms-2 col-sm-3 col-form-label fw-bold text-end">
              Comments:
            </CFormLabel>
            <CCol sm={6}>
              <CFormTextarea
                data-testid="text-area"
                aria-label="textarea"
                autoComplete="off"
                maxLength={150}
                value={approveLeaveComment}
                className="sh-question"
                onChange={(e) => setApproveLeaveComment(e.target.value)}
              ></CFormTextarea>
              <p>{approveLeaveComment?.length}/150</p>
            </CCol>
          </CRow>
        </>
      </OModal>
      <OModal
        alignment="center"
        visible={isRejectModalVisibility}
        setVisible={setIsRejectModalVisibility}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={handleRejectLeave}
      >
        <p>{`Would you like to reject the leave ?`}</p>
      </OModal>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isManagerCheckModal}
        setVisible={setIsManagerCheckModal}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <p>{isManagerCheckText}</p>
      </OModal>
      <OModal
        alignment="center"
        visible={isCancelAfterApprovalVisibility}
        setVisible={setIsCancelAfterApprovalVisibility}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={handleCancelAfterApprovalLeave}
      >
        <p>{`Would you like to approve for Cancel After approval ?`}</p>
      </OModal>
    </>
  )
}
export default EmployeeLeaveRequests
