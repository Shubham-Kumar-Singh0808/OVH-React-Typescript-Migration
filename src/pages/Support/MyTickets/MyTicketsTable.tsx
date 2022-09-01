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
import React, { useMemo, useState } from 'react'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { currentPageData } from '../../../utils/paginationUtils'

const MyTicketsTable = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [ticketSubject, setTicketSubject] = useState<string>('')

  const getAllTickets = useTypedSelector(
    reduxServices.myTickets.selectors.allTickets,
  )

  const pageFromState = useTypedSelector(
    reduxServices.myTickets.selectors.pageFromState,
  )

  const pageSizeFromState = useTypedSelector(
    reduxServices.myTickets.selectors.pageSizeFromState,
  )

  const handleModal = (subject: string) => {
    setIsModalVisible(true)
    setTicketSubject(subject)
  }

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(getAllTickets.length, pageSizeFromState, pageFromState)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const currentPageItems = useMemo(
    () => currentPageData(getAllTickets, currentPage, pageSize),
    [getAllTickets, currentPage, pageSize],
  )

  return (
    <>
      <CTable striped>
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
          {currentPageItems &&
            currentPageItems?.map((ticket, index) => {
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
                  <CTableHeaderCell scope="row">{ticket.id}</CTableHeaderCell>
                  {ticketSubjectLimit ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid={`emp-comments${index}`}
                        onClick={() => handleModal(ticket.subject)}
                      >
                        {parse(ticketSubjectLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  {ticketSubjectLimit ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid={`emp-comments${index}`}
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
                    <CButton color="info" className="btn-ovh me-2">
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                    <CButton color="info" className="btn-ovh me-2">
                      <i
                        className="fa fa-times text-white"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                    <CButton color="info" className="btn-ovh me-2">
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
          <strong>
            {getAllTickets?.length
              ? `Total Records: ${getAllTickets.length}`
              : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {getAllTickets.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {getAllTickets.length > 20 && (
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
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        {ticketSubject}
      </OModal>
    </>
  )
}

export default MyTicketsTable
