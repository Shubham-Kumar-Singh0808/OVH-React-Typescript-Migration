import {
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CButton,
  CLink,
  CBadge,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { deviceLocale } from '../../../utils/dateFormatUtils'

const SearchEmployeeLeaveRequests = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isCommentsModalVisible, setIsCommentsModalVisible] =
    useState<boolean>(false)
  const [isApproveModalVisible, setIsApproveModalVisible] =
    useState<boolean>(false)
  const [isRejectModalVisible, setIsRejectModalVisible] =
    useState<boolean>(false)
  const [isSearchManagerCheckModal, setIsSearchManagerCheckModal] =
    useState<boolean>(false)
  const [searchModalText, setSearchModalText] = useState<string>('')
  const [isSearchManagerCheckText, setIsSearchManagerCheckText] =
    useState<string>('')
  const [selectedLeaveId, setSelectedLeaveId] = useState<number>(0)
  const [searchApproveLeaveComment, setSearchApproveLeaveComment] =
    useState<string>('')
  const [isCancelAfterApprovalVisibility, setIsCancelAfterApprovalVisibility] =
    useState<boolean>(false)

  const searchLeaves = useTypedSelector(
    reduxServices.leaveApprovals.selectors.searchLeaves,
  )

  const searchLeavesListSize = useTypedSelector(
    reduxServices.leaveApprovals.selectors.searchLeavesListSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.leaveApprovals.selectors.isLoading,
  )

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const selectStatus = useTypedSelector(
    reduxServices.leaveApprovals.selectors.selectStatus,
  )
  const selectMember = useTypedSelector(
    reduxServices.leaveApprovals.selectors.selectMember,
  )
  const filterByFromDate = useTypedSelector(
    reduxServices.leaveApprovals.selectors.filterByFromDate,
  )
  const filterByToDate = useTypedSelector(
    reduxServices.leaveApprovals.selectors.filterByToDate,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(searchLeavesListSize, 20)

  const handlePageSizeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleModal = (displayText: string) => {
    setIsCommentsModalVisible(true)
    setSearchModalText(displayText)
  }

  const handleDispatch = () => {
    return dispatch(
      reduxServices.leaveApprovals.getSearchEmployees({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        managerId: Number(employeeId),
        fromDate: new Date(filterByFromDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: 'numeric',
          day: '2-digit',
        }),
        toDate: new Date(filterByToDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: 'numeric',
          day: '2-digit',
        }),
        member: Number(selectMember),
        status: selectStatus,
      }),
    )
  }

  useEffect(() => {
    handleDispatch()
  }, [
    dispatch,
    currentPage,
    pageSize,
    employeeId,
    selectMember,
    selectStatus,
    filterByFromDate,
    filterByToDate,
  ])

  const searchLeaveStatusLabelColor = (
    searchLeaveStatus: string,
  ): JSX.Element => {
    if (searchLeaveStatus === 'PendingApproval') {
      return (
        <CBadge className="rounded-pill label-info">
          {'Pending Approval'}
        </CBadge>
      )
    } else if (searchLeaveStatus === 'Cancelled') {
      return (
        <CBadge className="rounded-pill label-gray-cancel">
          {searchLeaveStatus}
        </CBadge>
      )
    } else if (searchLeaveStatus === 'Approved') {
      return (
        <CBadge className="rounded-pill label-success">
          {searchLeaveStatus}
        </CBadge>
      )
    } else if (
      searchLeaveStatus === 'CancelAfterApproval' ||
      searchLeaveStatus === 'Rejected'
    ) {
      return (
        <CBadge className="rounded-pill label-danger">
          {searchLeaveStatus}
        </CBadge>
      )
    }
    return <></>
  }

  const handleSearchApproveModal = async (leaveId: number) => {
    setSelectedLeaveId(leaveId)
    const resultAction = await dispatch(
      reduxServices.leaveApprovals.checkProjectManagerExists(leaveId),
    )
    if (
      reduxServices.leaveApprovals.checkProjectManagerExists.fulfilled.match(
        resultAction,
      ) &&
      resultAction.payload === false
    ) {
      setIsApproveModalVisible(true)
    } else {
      setIsSearchManagerCheckModal(true)
      setIsSearchManagerCheckText(
        `Sorry! You can't approve this leave(s), please communicate with respective project manager.`,
      )
    }
  }
  const handleApproveModal = (leaveId: number) => {
    setSelectedLeaveId(leaveId)
    setIsCancelAfterApprovalVisibility(true)
  }

  const handleSearchRejectModal = async (leaveId: number) => {
    setSelectedLeaveId(leaveId)
    const resultAction = await dispatch(
      reduxServices.leaveApprovals.checkProjectManagerExists(leaveId),
    )
    if (
      reduxServices.leaveApprovals.checkProjectManagerExists.fulfilled.match(
        resultAction,
      ) &&
      resultAction.payload === false
    ) {
      setIsRejectModalVisible(true)
    } else {
      setIsSearchManagerCheckModal(true)
      setIsSearchManagerCheckText(
        `Sorry! You can't reject this leave(s), please communicate with respective project manager.`,
      )
    }
  }

  const dynamicFormLabelProperties = (rows: string, className: string) => {
    return {
      rows,
      className,
    }
  }

  const searchLeaveRejectToastElement = (
    <OToast
      toastColor="danger"
      toastMessage="Leave already cancelled,so cannot Reject/you are not authorized to reject leave."
    />
  )

  const handleApproveSearchLeave = async () => {
    setIsApproveModalVisible(false)
    const leaveApproveResultAction = await dispatch(
      reduxServices.leaveApprovals.leaveApprove({
        leaveId: selectedLeaveId,
        comments: searchApproveLeaveComment,
      }),
    )
    if (
      reduxServices.leaveApprovals.leaveApprove.fulfilled.match(
        leaveApproveResultAction,
      )
    ) {
      handleDispatch()
    }
  }

  const handleRejectSearchLeave = async () => {
    setIsRejectModalVisible(false)
    const leaveRejectResultAction = await dispatch(
      reduxServices.leaveApprovals.leaveReject({
        leaveId: selectedLeaveId,
      }),
    )
    if (
      reduxServices.leaveApprovals.leaveReject.fulfilled.match(
        leaveRejectResultAction,
      )
    ) {
      handleDispatch()
    } else if (
      reduxServices.leaveApprovals.leaveApprove.rejected.match(
        leaveRejectResultAction,
      ) &&
      leaveRejectResultAction.payload === 500
    ) {
      dispatch(
        reduxServices.app.actions.addToast(searchLeaveRejectToastElement),
      )
    }
  }

  const tableHeaderCellProps = {
    width: '12%',
    scope: 'col',
  }
  const handleCancelAfterApprovalLeave = async () => {
    dispatch(
      reduxServices.leaveApprovals.checkProjectManagerExists(selectedLeaveId),
    )
    setIsCancelAfterApprovalVisibility(false)
    const cancelAfterApprovalResultAction = await dispatch(
      reduxServices.leaveApprovals.leaveReject({
        leaveId: selectedLeaveId,
      }),
    )
    if (
      reduxServices.leaveApprovals.leaveReject.fulfilled.match(
        cancelAfterApprovalResultAction,
      )
    ) {
      dispatch(
        reduxServices.leaveApprovals.getSearchEmployees({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          managerId: Number(employeeId),
          fromDate: new Date(filterByFromDate).toLocaleDateString(
            deviceLocale,
            {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            },
          ),
          toDate: new Date(filterByToDate).toLocaleDateString(deviceLocale, {
            year: 'numeric',
            month: 'numeric',
            day: '2-digit',
          }),
          member: Number(selectMember),
          status: selectStatus,
        }),
      )
    }
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
              <CTableHeaderCell {...tableHeaderCellProps}>
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          {isLoading !== ApiLoadingState.loading ? (
            <CTableBody>
              {searchLeaves?.map((currentLeaveItem, index) => {
                const employeeCommentsLimit =
                  currentLeaveItem.employeeComments &&
                  currentLeaveItem.employeeComments.length > 30
                    ? `${currentLeaveItem.employeeComments.substring(0, 30)}...`
                    : currentLeaveItem.employeeComments
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      {currentLeaveItem.employeeDTO.fullName}
                    </CTableDataCell>
                    <CTableDataCell>
                      {currentLeaveItem.appliedDate}
                    </CTableDataCell>
                    <CTableDataCell>{currentLeaveItem.from}</CTableDataCell>
                    <CTableDataCell>{currentLeaveItem.to}</CTableDataCell>
                    <CTableDataCell>
                      {currentLeaveItem.numberOfDays}
                    </CTableDataCell>
                    <CTableDataCell>
                      {currentLeaveItem.leaveCategoryDTO.name}
                    </CTableDataCell>
                    <CTableDataCell className="sh-leave-approval-link">
                      {employeeCommentsLimit ? (
                        <CLink
                          className="cursor-pointer"
                          data-testid="search-leave-btn-link"
                          onClick={() =>
                            handleModal(currentLeaveItem.employeeComments)
                          }
                        >
                          {parse(employeeCommentsLimit)}
                        </CLink>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {searchLeaveStatusLabelColor(currentLeaveItem.status)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {currentLeaveItem.approvedBy}
                    </CTableDataCell>
                    <CTableDataCell>
                      {currentLeaveItem.status === 'PendingApproval' ? (
                        <>
                          <CButton
                            color="success btn-ovh me-1"
                            data-testid="search-leave-approve-btn"
                            className="btn-ovh-employee-list"
                            onClick={() => {
                              handleSearchApproveModal(currentLeaveItem.id)
                            }}
                          >
                            <i
                              className="fa fa-check-circle-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                          <CButton
                            color="danger btn-ovh me-1"
                            data-testid="reject-leave-approve-btn"
                            className="btn-ovh-employee-list"
                            onClick={() => {
                              handleSearchRejectModal(currentLeaveItem.id)
                            }}
                          >
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </CButton>
                        </>
                      ) : (
                        <></>
                      )}
                      {currentLeaveItem.status === 'CancelAfterApproval' ? (
                        <>
                          <CButton
                            color="success btn-ovh me-1"
                            data-testid="search-leave-approve-btn"
                            className="btn-ovh-employee-list"
                            onClick={() => {
                              handleApproveModal(currentLeaveItem.id)
                            }}
                          >
                            <i
                              className="fa fa-check-circle-o"
                              aria-hidden="true"
                            ></i>
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
              <OLoadingSpinner
                data-testid="search-leave-loader"
                type={LoadingType.PAGE}
              />
            </>
          )}
        </CTable>
        {searchLeaves && isLoading !== ApiLoadingState.loading && (
          <CRow>
            <CCol xs={4} md={3}>
              <p>
                <strong>
                  {searchLeaves?.length
                    ? `Total Records: ${searchLeavesListSize}`
                    : `No Records found...`}
                </strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {searchLeavesListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelect}
                  options={[20, 40, 60, 80, 100]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {searchLeavesListSize > 20 && (
              <CCol
                xs={5}
                md={6}
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
        visible={isCommentsModalVisible}
        setVisible={setIsCommentsModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <p>
          <span className="descriptionField">
            <div
              dangerouslySetInnerHTML={{
                __html: searchModalText,
              }}
            />
          </span>
        </p>
      </OModal>
      <OModal
        alignment="center"
        visible={isApproveModalVisible}
        setVisible={setIsApproveModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={handleApproveSearchLeave}
      >
        <>
          <h4 className="sh-accept-leave-h4">Accept Leave</h4>
          <CRow className="mt-5 mb-5">
            <CFormLabel className=" ms-2 col-sm-3 col-form-label fw-bold text-end">
              Comments:
            </CFormLabel>
            <CCol sm={6}>
              <CFormTextarea
                {...dynamicFormLabelProperties('2', 'sh-text-area')}
                onChange={(e) => setSearchApproveLeaveComment(e.target.value)}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </>
      </OModal>
      <OModal
        alignment="center"
        visible={isRejectModalVisible}
        setVisible={setIsRejectModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={handleRejectSearchLeave}
      >
        <p>{`Would you like to reject the leave ?`}</p>
      </OModal>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isSearchManagerCheckModal}
        setVisible={setIsSearchManagerCheckModal}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <p>{isSearchManagerCheckText}</p>
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
export default SearchEmployeeLeaveRequests
