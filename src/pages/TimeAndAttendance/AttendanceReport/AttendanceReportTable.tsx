import {
  CCol,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const AttendanceReportTable = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.isLoading,
  )
  const employeeAttendanceReport = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.employeeAttendanceReport,
  )
  const days = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.days,
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
            {days.map((day, index) => {
              return <CTableHeaderCell key={index}>{day}</CTableHeaderCell>
            })}
            <CTableHeaderCell>Absent</CTableHeaderCell>
            <CTableHeaderCell>Late Coming</CTableHeaderCell>
            <CTableHeaderCell>Casual/Paid</CTableHeaderCell>
            <CTableHeaderCell>LOP</CTableHeaderCell>
            <CTableHeaderCell>Holiday</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading !== ApiLoadingState.loading ? (
            <>
              {employeeAttendanceReport.map(
                (currentReportItem, reportIndex) => {
                  return (
                    <>
                      <CTableRow key={reportIndex}>
                        <CTableDataCell scope="row">
                          {currentReportItem.id}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {currentReportItem.fullName}
                        </CTableDataCell>
                        {currentReportItem.bioAttendanceDtoSet.map(
                          (bioAttendanceItem, bioAttendanceItemIndex) => {
                            return (
                              <React.Fragment key={bioAttendanceItemIndex}>
                                <CTableDataCell scope="row">{}</CTableDataCell>
                              </React.Fragment>
                            )
                          },
                        )}
                        <CTableDataCell scope="row"></CTableDataCell>
                        <CTableDataCell scope="row"></CTableDataCell>
                        <CTableDataCell scope="row"></CTableDataCell>
                        <CTableDataCell scope="row"></CTableDataCell>
                      </CTableRow>
                    </>
                  )
                },
              )}
            </>
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
