import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const TicketReportTable = (): JSX.Element => {
  const getTicketReportList = useTypedSelector(
    reduxServices.ticketReport.selectors.ticketsReport,
  )

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tracker</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Sub-Category Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">No.of Tickets</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              No.of Closed Tickets
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              No.of Pending Tickets
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getTicketReportList.map((ticketReport, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell>{ticketReport.trackerName}</CTableDataCell>
                <CTableDataCell>{ticketReport.categoryName}</CTableDataCell>
                <CTableDataCell>{ticketReport.subCategoryName}</CTableDataCell>
                <CTableDataCell>{ticketReport.noOfTickets}</CTableDataCell>
                <CTableDataCell>
                  {ticketReport.noOfClosedTickets}
                </CTableDataCell>
                <CTableDataCell>
                  {ticketReport.noOfPendingTickets}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <strong>
        {getTicketReportList?.length
          ? `Total Records: ${getTicketReportList?.length}`
          : `No Records found...`}
      </strong>
    </>
  )
}
export default TicketReportTable
