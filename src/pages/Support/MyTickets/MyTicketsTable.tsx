import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CLink,
  CCol,
  CRow,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const MyTicketsTable = ({
  setToggle,
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}: {
  setToggle: (value: string) => void
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  const [toCancelTicketId, setToCancelTicketId] = useState(0)
  const [ticketSubject, setTicketSubject] = useState<string>('')
  const dispatch = useAppDispatch()
  const getAllTickets = useTypedSelector(
    reduxServices.tickets.selectors.allTickets,
  )

  const listSize = useTypedSelector(
    reduxServices.tickets.selectors.allTicketsListSize,
  )

  const handleModal = (subject: string) => {
    setIsModalVisible(true)
    setTicketSubject(subject)
  }

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleTicketHistoryClick = (id: number) => {
    setToggle('ticketHistory')
    dispatch(
      reduxServices.tickets.ticketHistoryDetails({
        filterName: 'support',
        id,
      }),
    )
    dispatch(reduxServices.ticketApprovals.actions.selectTicketId(id))
  }

  const handleCancelTicketModal = (requestId: number) => {
    setToCancelTicketId(requestId)
    setIsCancelModalVisible(true)
  }

  const handleConfirmCancelTicketDetails = async () => {
    setIsCancelModalVisible(false)
    const cancelTicketResultAction = await dispatch(
      reduxServices.tickets.cancelTicket(toCancelTicketId),
    )
    if (
      reduxServices.tickets.cancelTicket.fulfilled.match(
        cancelTicketResultAction,
      )
    ) {
      dispatch(
        reduxServices.tickets.getTickets({
          endIndex: 20,
          multiSearch: '',
          startIndex: 0,
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Ticket cancelled successfully"
          />,
        ),
      )
    }
  }

  return (
    <>
      {getAllTickets.length ? (
        <>
          <CTable striped className="mt-3">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Ticket No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Approval Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Ticket Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {getAllTickets &&
                getAllTickets?.map((ticket, index) => {
                  const ticketSubjectLimit =
                    ticket.subject && ticket.subject.length > 30
                      ? `${ticket.subject.substring(0, 30)}...`
                      : ticket.subject

                  const ticketDiscriptionLimit =
                    ticket.description && ticket.description.length > 30
                      ? `${ticket.description.substring(0, 30)}...`
                      : ticket.description

                  const ticketDescription =
                    ticket.description !== null
                      ? parse(ticketDiscriptionLimit)
                      : 'N/A'
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{ticket.id}</CTableDataCell>
                      {ticketSubjectLimit ? (
                        <CTableDataCell>
                          <CLink
                            className="cursor-pointer text-decoration-none text-primary"
                            data-testid={`emp-subject${index}`}
                            onClick={() => handleModal(ticket.subject)}
                          >
                            {parse(ticketSubjectLimit)}
                          </CLink>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell>{`N/A`}</CTableDataCell>
                      )}
                      {ticketDiscriptionLimit ? (
                        <CTableDataCell>
                          <CLink
                            className="cursor-pointer text-decoration-none text-primary"
                            data-testid={`mgr-comments${index}`}
                            onClick={() => handleModal(ticket.description)}
                          >
                            {ticketDescription}
                          </CLink>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell>{`N/A`}</CTableDataCell>
                      )}
                      <CTableDataCell>{ticket.priority}</CTableDataCell>
                      <CTableDataCell>{ticket.accessStartDate}</CTableDataCell>
                      <CTableDataCell>{ticket.accessEndDate}</CTableDataCell>
                      <CTableDataCell>{ticket.approvalStatus}</CTableDataCell>
                      <CTableDataCell>{ticket.status}</CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/updateTicket/${ticket.id}`}>
                          <CButton
                            color="info"
                            className="btn-ovh me-2"
                            disabled={ticket.approvalStatus === 'Cancelled'}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </Link>
                        <CButton
                          color="btn btn-warning"
                          className="btn-ovh me-2"
                          data-testid="cancel-btn"
                          onClick={() => handleCancelTicketModal(ticket.id)}
                          disabled={ticket.approvalStatus === 'Cancelled'}
                        >
                          <i
                            className="fa fa-times text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                        <CButton
                          color="info"
                          className="btn-ovh me-2"
                          data-testid="history-btn"
                          onClick={() => handleTicketHistoryClick(ticket.id)}
                        >
                          <i
                            className="fa fa-bar-chart text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {listSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {listSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {listSize > 20 && (
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
          <CRow className="category-no-data">
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
        {ticketSubject}
      </OModal>
      <OModal
        alignment="center"
        visible={isCancelModalVisible}
        setVisible={setIsCancelModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmCancelTicketDetails}
      >
        {`Do you really want to cancel this ticket ?`}
      </OModal>
    </>
  )
}

export default MyTicketsTable
