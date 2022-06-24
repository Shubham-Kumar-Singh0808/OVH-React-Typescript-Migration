import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import React from 'react'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const AttendanceReportTable = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.isLoading,
  )
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
          {isLoading !== ApiLoadingState.loading ? (
            <CTableRow>
              <CTableDataCell scope="row">1</CTableDataCell>
              <CTableDataCell scope="row">5</CTableDataCell>
              <CTableDataCell scope="row">7</CTableDataCell>
              <CTableDataCell scope="row">5</CTableDataCell>
              <CTableDataCell scope="row">2</CTableDataCell>
              <CTableDataCell scope="row">3</CTableDataCell>
              <CTableDataCell scope="row">2</CTableDataCell>
            </CTableRow>
          ) : (
            <CCol>
              <CRow className="category-loading-spinner ms-1">
                <CSpinner />
              </CRow>
            </CCol>
          )}
        </CTableBody>
      </CTable>
    </>
  )
}

export default AttendanceReportTable
