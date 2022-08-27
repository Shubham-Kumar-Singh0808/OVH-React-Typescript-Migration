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
import React, { useMemo, useState } from 'react'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { TicketDetailsTableProps } from '../../../types/Support/Report/ticketReportTypes'
import { currentPageData } from '../../../utils/paginationUtils'

const TicketDetailsTable = ({
  backButtonHandler,
}: TicketDetailsTableProps): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [subject, setSubject] = useState<string>('')
  const getTicketDetailsList = useTypedSelector(
    reduxServices.ticketReport.selectors.ticketsDetails,
  )

  const pageFromState = useTypedSelector(
    reduxServices.ticketReport.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.ticketReport.selectors.pageSizeFromState,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    getTicketDetailsList.length,
    pageSizeFromState,
    pageFromState,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const currentPageItems = useMemo(
    () => currentPageData(getTicketDetailsList, currentPage, pageSize),
    [getTicketDetailsList, currentPage, pageSize],
  )

  const handleModal = (ticket: string) => {
    setIsModalVisible(true)
    setSubject(ticket)
  }
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            onClick={backButtonHandler}
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Ticket No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tracker</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Due Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Assignee</CTableHeaderCell>
            <CTableHeaderCell scope="col">Spent Time(hh.mm)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Approval Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ticket Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems?.map((ticketDetail, index) => {
            const subjectLimit =
              ticketDetail.subject && ticketDetail.subject.length > 30
                ? `${ticketDetail.subject.substring(0, 30)}...`
                : ticketDetail.subject

            const ticketDescriptionLimit =
              ticketDetail.description && ticketDetail.description.length > 32
                ? `${ticketDetail.description.substring(0, 32)}...`
                : ticketDetail.description
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">
                  {ticketDetail.id}
                </CTableHeaderCell>
                <CTableDataCell>{ticketDetail.employeeName}</CTableDataCell>
                <CTableDataCell>
                  <CLink
                    className="cursor-pointer text-decoration-none text-primary"
                    onClick={() => handleModal(ticketDetail.subject)}
                  >
                    {parse(subjectLimit)}
                  </CLink>
                </CTableDataCell>
                <CTableDataCell>{ticketDetail.trackerName}</CTableDataCell>
                <CTableDataCell>
                  <CLink
                    className="cursor-pointer text-decoration-none text-primary"
                    onClick={() => handleModal(ticketDetail.description)}
                  >
                    {parse(ticketDescriptionLimit)}
                  </CLink>
                </CTableDataCell>
                <CTableDataCell>{ticketDetail.priority}</CTableDataCell>
                <CTableDataCell>{ticketDetail.startDate}</CTableDataCell>
                <CTableDataCell>{ticketDetail.approvedBy}</CTableDataCell>
                <CTableDataCell>{ticketDetail.approvalStatus}</CTableDataCell>
                <CTableDataCell>{ticketDetail.actualTime}</CTableDataCell>
                <CTableDataCell>{ticketDetail.approvalStatus}</CTableDataCell>
                <CTableDataCell>{ticketDetail.status}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {getTicketDetailsList?.length
              ? `Total Records: ${getTicketDetailsList.length}`
              : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {getTicketDetailsList.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {getTicketDetailsList.length > 20 && (
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
        {subject}
      </OModal>
    </>
  )
}

export default TicketDetailsTable
