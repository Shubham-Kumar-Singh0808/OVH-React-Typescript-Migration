import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
} from '@coreui/react-pro'
import React from 'react'

const HiveActivityDetailsTable = (): JSX.Element => {
  return (
    <>
      <CTable striped responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Project</CTableHeaderCell>
            <CTableHeaderCell>Version</CTableHeaderCell>
            <CTableHeaderCell>Logged Date</CTableHeaderCell>
            <CTableHeaderCell>Activity</CTableHeaderCell>
            <CTableHeaderCell>Task id</CTableHeaderCell>
            <CTableHeaderCell>Task</CTableHeaderCell>
            <CTableHeaderCell>Task Start Date</CTableHeaderCell>
            <CTableHeaderCell>Task End Date</CTableHeaderCell>
            <CTableHeaderCell>Comments</CTableHeaderCell>
            <CTableHeaderCell>Hours</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody></CTableBody>
      </CTable>
    </>
  )
}

export default HiveActivityDetailsTable
