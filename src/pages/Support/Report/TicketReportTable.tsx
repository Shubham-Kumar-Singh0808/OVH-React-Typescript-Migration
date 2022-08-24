import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
} from '@coreui/react-pro'
import React from 'react'

const TicketReportTable = (): JSX.Element => {
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
        <CTableBody></CTableBody>
      </CTable>
    </>
  )
}
export default TicketReportTable
