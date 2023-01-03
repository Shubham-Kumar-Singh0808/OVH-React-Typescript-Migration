import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
} from '@coreui/react-pro'
import React from 'react'

const ReviewListTable = (): JSX.Element => {
  return (
    <CTable striped responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Manager Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Department</CTableHeaderCell>
          <CTableHeaderCell scope="col">Department</CTableHeaderCell>
          <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
          <CTableHeaderCell scope="col">Month</CTableHeaderCell>
          <CTableHeaderCell scope="col">Emp Avg Rating</CTableHeaderCell>
          <CTableHeaderCell scope="col">
            {"Manager's Avg Rating"}
          </CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell></CTableHeaderCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )
}

export default ReviewListTable
