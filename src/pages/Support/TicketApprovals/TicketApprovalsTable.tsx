import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCol,
  CRow,
  CLink,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OToast from '../../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const TicketApprovalsTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  renderTicketApprovals,
  setRenderTicketApprovals,
  setToggle,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  renderTicketApprovals: boolean
  setRenderTicketApprovals: (value: boolean) => void
  setToggle: (value: string) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isDescriptionModalVisible, setIsDescriptionModalVisible] =
    useState<boolean>(false)
  const [isSubjectModalVisible, setIsSubjectModalVisible] =
    useState<boolean>(false)
  const [modalDescription, setModalDescription] = useState<string>('')
  const [modalSubject, setModalSubject] = useState<string>('')
  const [isRejectModalVisible, setIsRejectModalVisible] =
    useState<boolean>(false)
  const [subCategoryName, setSubCategoryName] = useState<string>('')
  const [selectedTicketId, setSelectedTicketId] = useState<number>(0)

  const ticketsForApproval = useTypedSelector(
    reduxServices.ticketApprovals.selectors.ticketsForApproval,
  )

  const isLoading = useTypedSelector(
    reduxServices.ticketApprovals.selectors.isLoading,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const tableHeaderCellPropsTicketNo = {
    width: '8%',
    scope: 'col',
  }
  const tableHeaderCellPropsEmployeeName = {
    width: '11%',
    scope: 'col',
  }
  const tableHeaderCellPropsStartDate = {
    width: '8%',
    scope: 'col',
  }
  const tableHeaderCellPropsSubject = {
    width: '6%',
    scope: 'col',
  }
  const tableHeaderCellPropsAction = {
    width: '10%',
    scope: 'col',
  }

  const ticketRejectedSuccessToast = (
    <OToast toastMessage="Ticket reject successfully" toastColor="success" />
  )

  const handleSubjectModal = (value: string) => {
    setIsSubjectModalVisible(true)
    setModalSubject(value)
  }

  const handleDescriptionModal = (value: string) => {
    setIsDescriptionModalVisible(true)
    setModalDescription(value)
  }

  const handleRejectModal = (value: string, id: number) => {
    setIsRejectModalVisible(true)
    setSubCategoryName(value)
    setSelectedTicketId(id)
  }

  const handleConfirmRejectTicket = async (ticketId: number) => {
    setIsRejectModalVisible(false)
    await dispatch(reduxServices.ticketApprovals.rejectTicket(ticketId))
    setRenderTicketApprovals(!renderTicketApprovals)
    dispatch(reduxServices.app.actions.addToast(ticketRejectedSuccessToast))
  }

  const handleTicketApprovalsHistory = (id: number) => {
    setToggle('ticketApprovalHistory')
    dispatch(
      reduxServices.tickets.ticketHistoryDetails({
        filterName: 'support',
        id,
      }),
    )
    dispatch(reduxServices.ticketApprovals.actions.selectTicketId(id))
  }

  return (
    <>
      <CTable responsive striped className="text-start mt-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell {...tableHeaderCellPropsTicketNo}>
              Ticket No
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsEmployeeName}>
              Employee Name
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsSubject}>
              Subject
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Tracker</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsStartDate}>
              Start Date
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsStartDate}>
              Due Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Assignee</CTableHeaderCell>
            <CTableHeaderCell scope="col">Spent Time(hh.mm)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Approval Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ticket Status</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsAction}>
              Actions
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            ticketsForApproval &&
            ticketsForApproval.list?.map((ticketItem, index) => {
              const subjectLimit =
                ticketItem.subject && ticketItem.subject.length > 30
                  ? `${ticketItem.subject.substring(0, 30)}...`
                  : ticketItem.subject
              const descriptionLimit =
                ticketItem.description && ticketItem.description.length > 30
                  ? `${ticketItem.description.substring(0, 30)}...`
                  : ticketItem.description
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{ticketItem.id}</CTableDataCell>
                  <CTableDataCell scope="row">
                    {ticketItem.employeeName}
                  </CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    <CLink
                      color="info"
                      className="cursor-pointer text-decoration-none"
                      data-testid="ticket-subject-link"
                      onClick={() => handleSubjectModal(ticketItem.subject)}
                    >
                      {parse(subjectLimit)}
                    </CLink>
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {ticketItem.trackerName}
                  </CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    {ticketItem.description ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid="ticket-description-link"
                        onClick={() =>
                          handleDescriptionModal(
                            ticketItem.description as string,
                          )
                        }
                      >
                        {parse(descriptionLimit as string)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {ticketItem.priority}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {ticketItem.startDate}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {ticketItem.endDate ? ticketItem.endDate : 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {ticketItem.approvedBy}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {ticketItem.estimatedTime}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {ticketItem.approvalStatus}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {ticketItem.status}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    <>
                      <Link to={`/updateTicketInApprovals/${ticketItem.id}`}>
                        <CButton color="info" className="btn-ovh me-2">
                          <i className="fa fa-edit" aria-hidden="true"></i>
                        </CButton>
                      </Link>
                      <CButton
                        color="danger"
                        className="btn-ovh me-2"
                        data-testid="ticket-reject-btn"
                        disabled={
                          ticketItem.approvalStatus === 'Approved' ||
                          ticketItem.approvalStatus === 'Rejected' ||
                          ticketItem.approvalStatus === 'Cancelled' ||
                          !ticketItem.disableApprove
                        }
                        onClick={() =>
                          handleRejectModal(
                            ticketItem.subCategoryName,
                            ticketItem.id,
                          )
                        }
                      >
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </CButton>
                      <CButton
                        color="info"
                        className="btn-ovh me-2"
                        data-testid="ticketTimelineBtn"
                        onClick={() =>
                          handleTicketApprovalsHistory(ticketItem.id)
                        }
                      >
                        <i className="fa fa-bar-chart" aria-hidden="true"></i>
                      </CButton>
                    </>
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {ticketsForApproval.list?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {ticketsForApproval.size}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {ticketsForApproval.size > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {ticketsForApproval.size > 20 && (
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
      ) : (
        <CCol>
          <CRow className="mt-3 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isDescriptionModalVisible}
        setVisible={setIsDescriptionModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <p>
          <div
            dangerouslySetInnerHTML={{
              __html: modalDescription,
            }}
          />
        </p>
      </OModal>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isSubjectModalVisible}
        setVisible={setIsSubjectModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <p>{modalSubject}</p>
      </OModal>
      <OModal
        alignment="center"
        visible={isRejectModalVisible}
        setVisible={setIsRejectModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalHeaderClass="d-none"
        confirmButtonAction={() => handleConfirmRejectTicket(selectedTicketId)}
      >
        <>
          Do you really want to reject this <strong>{subCategoryName}</strong>{' '}
          ticket ?
        </>
      </OModal>
    </>
  )
}

export default TicketApprovalsTable
