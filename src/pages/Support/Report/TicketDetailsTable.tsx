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

const TicketDetailsTable = (): JSX.Element => {
  const getTicketReportList = useTypedSelector(
    reduxServices.ticketReport.selectors.ticketsDetails,
  )
  console.log(getTicketReportList)
  return (
    <>
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
          {getTicketReportList.map((ticketDetail, index) => {
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">
                  {ticketDetail.id}
                </CTableHeaderCell>
                <CTableDataCell>{ticketDetail.employeeName}</CTableDataCell>
                <CTableDataCell>{ticketDetail.subject}</CTableDataCell>
                <CTableDataCell>{ticketDetail.subCategoryName}</CTableDataCell>
                <CTableDataCell>{ticketDetail.trackerName}</CTableDataCell>
                <CTableDataCell>{ticketDetail.description}</CTableDataCell>
                <CTableDataCell>{ticketDetail.priority}</CTableDataCell>
                <CTableDataCell>{ticketDetail.startDate}</CTableDataCell>
                <CTableDataCell>{ticketDetail.approvedBy}</CTableDataCell>
                <CTableDataCell>{ticketDetail.assigneeName}</CTableDataCell>
                <CTableDataCell>{ticketDetail.actualTime}</CTableDataCell>
                <CTableDataCell>{ticketDetail.approvalStatus}</CTableDataCell>
                <CTableDataCell>{ticketDetail.status}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default TicketDetailsTable
