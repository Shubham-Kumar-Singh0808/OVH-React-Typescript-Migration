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
import { deviceLocale } from '../../../utils/leaveApprovalsUtils'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'

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

  useEffect(() => {
    dispatch(
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

  return (
    <>
      <CRow>
        <CTable striped responsive>
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
                            color="success"
                            className="btn-ovh me-2"
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
                            color="danger"
                            className="btn-ovh me-2"
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
        {isLoading !== ApiLoadingState.loading && searchLeaves?.length ? (
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {searchLeavesListSize}</strong>
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
        ) : (
          <CCol>
            <CRow className="mt-3 ms-3">
              <h5>No Records Found... </h5>
            </CRow>
          </CCol>
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
        <p>{searchModalText}</p>
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
    </>
  )
}
export default SearchEmployeeLeaveRequests
