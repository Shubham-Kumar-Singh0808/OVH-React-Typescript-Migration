import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'

const AttendanceReportTable = (): JSX.Element => {
  return (
    <>
      <CTable
        striped
        responsive
        className="ps-0 pe-0 shift-configuration-table mt-1"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Absent</CTableHeaderCell>
            <CTableHeaderCell>Late Coming</CTableHeaderCell>
            <CTableHeaderCell>Casual/Paid</CTableHeaderCell>
            <CTableHeaderCell>LOP</CTableHeaderCell>
            <CTableHeaderCell>Holiday</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell scope="row">1</CTableDataCell>
            <CTableDataCell scope="row">5</CTableDataCell>
            <CTableDataCell scope="row">7</CTableDataCell>
            <CTableDataCell scope="row">5</CTableDataCell>
            <CTableDataCell scope="row">2</CTableDataCell>
            <CTableDataCell scope="row">3</CTableDataCell>
            <CTableDataCell scope="row">2</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default AttendanceReportTable
