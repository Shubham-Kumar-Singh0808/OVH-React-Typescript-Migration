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

  const [isCommentsModalVisibility, setIsCommentsModalVisibility] =
    useState<boolean>(false)
  const [isApproveModalVisibility, setIsApproveModalVisibility] =
    useState<boolean>(false)
  const [isRejectModalVisibility, setIsRejectModalVisibility] =
    useState<boolean>(false)
  const [isManagerCheckModal, setIsManagerCheckModal] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')
  const [isManagerCheckText, setIsManagerCheckText] = useState<string>('')
  const [selectLeaveId, setSelectLeaveId] = useState<number>(0)
  const [approveLeaveComment, setApproveLeaveComment] = useState<string>('')

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

  const leaveStatusLabelColor = (leaveStatus: string): JSX.Element => {
    if (leaveStatus === 'PendingApproval') {
      return (
        <CBadge className="rounded-pill label-info">
          {'Pending Approval'}
        </CBadge>
      )
    } else if (leaveStatus === 'Cancelled') {
      return (
        <CBadge className="rounded-pill label-gray-cancel">
          {leaveStatus}
        </CBadge>
      )
    } else if (leaveStatus === 'Approved') {
      return (
        <CBadge className="rounded-pill label-success">{leaveStatus}</CBadge>
      )
    } else if (
      leaveStatus === 'CancelAfterApproval' ||
      leaveStatus === 'Rejected'
    ) {
      return (
        <CBadge className="rounded-pill label-danger">{leaveStatus}</CBadge>
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

  const dynamicFormLabelProps = (rows: string, className: string) => {
    return {
      rows,
      className,
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
    } else if (
      reduxServices.leaveApprovals.leaveApprove.rejected.match(
        leaveRejectResultAction,
      ) &&
      leaveRejectResultAction.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(leaveRejectToastElement))
    }
  }

  const tableHeaderCellPropsAction = {
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
              <CTableHeaderCell {...tableHeaderCellPropsAction}>
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          {isLoading !== ApiLoadingState.loading ? (
            <CTableBody>
              {searchLeaves?.map((employeeLeaveItem, index) => {
                const employeeCommentsLimit =
                  employeeLeaveItem.employeeComments &&
                  employeeLeaveItem.employeeComments.length > 30
                    ? `${employeeLeaveItem.employeeComments.substring(
                        0,
                        30,
                      )}...`
                    : employeeLeaveItem.employeeComments
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
                          onClick={() =>
                            handleModal(employeeLeaveItem.employeeComments)
                          }
                        >
                          {parse(employeeCommentsLimit)}
                        </CLink>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {leaveStatusLabelColor(employeeLeaveItem.status)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {employeeLeaveItem.approvedBy}
                    </CTableDataCell>
                    <CTableDataCell>
                      {employeeLeaveItem.status === 'PendingApproval' ? (
                        <>
                          <CButton
                            color="success"
                            className="btn-ovh me-2"
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
                            color="danger"
                            className="btn-ovh me-2"
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
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
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
        visible={isCommentsModalVisibility}
        setVisible={setIsCommentsModalVisibility}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <p>{modalText}</p>
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
                {...dynamicFormLabelProps('2', 'sh-text-area')}
                onChange={(e) => setApproveLeaveComment(e.target.value)}
              ></CFormTextarea>
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
    </>
  )
}
export default SearchEmployeeLeaveRequests
