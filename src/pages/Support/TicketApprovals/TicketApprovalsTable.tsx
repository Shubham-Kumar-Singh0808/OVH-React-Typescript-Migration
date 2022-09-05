import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
} from '@coreui/react-pro'
import React from 'react'

const TicketApprovalsTable = (): JSX.Element => {
  return (
    <CTable responsive striped className="text-start mt-5">
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
          <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody color="light"></CTableBody>
    </CTable>
  )
}

export default TicketApprovalsTable
