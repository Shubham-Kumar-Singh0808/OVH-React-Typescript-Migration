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
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { AttendanceReportTableProps } from '../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'

const AttendanceReportTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: AttendanceReportTableProps): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.isLoading,
  )

  const employeeAttendanceReport = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.employeeAttendanceReport,
  )

  const days = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.days,
  )

  const listSize = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.listSize,
  )

  const tableHeaderCellPropsDays = {
    width: '2%',
    scope: 'col',
  }
  const tableHeaderCellPropsLateComing = {
    width: '18%',
    scope: 'col',
  }
  const tableHeaderCellPropsName = {
    width: '12%',
    scope: 'col',
  }
  const tableHeaderCellPropsID = {
    width: '7%',
    scope: 'col',
  }

  const attendanceStatus = (
    status: string | null,
    color: string,
    title: string | null,
  ) => {
    switch (status) {
      case 'P':
        return <i className="fa fa-check sh-attendance-icon"></i>
      case 'A':
        return <i className="fa fa-times"></i>
      default:
        return <span style={{ color: 'blue' }}>-</span>
    }
  }

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      <CTable
        striped
        responsive
        className="ps-0 pe-0 atttendance-report-table mt-1"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell {...tableHeaderCellPropsID}>ID</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsName}>
              Name
            </CTableHeaderCell>
            {days.map((day, index) => {
              return (
                <React.Fragment key={index}>
                  <CTableHeaderCell {...tableHeaderCellPropsDays}>
                    {day}
                  </CTableHeaderCell>
                </React.Fragment>
              )
            })}
            <CTableHeaderCell>Absent</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsLateComing}>
              Late Coming
            </CTableHeaderCell>
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
                                <CTableDataCell
                                  scope="row"
                                  className="text-center"
                                >
                                  {attendanceStatus(
                                    bioAttendanceItem.attendanceStatus,
                                    bioAttendanceItem.color,
                                    bioAttendanceItem.title,
                                  )}
                                </CTableDataCell>
                              </React.Fragment>
                            )
                          },
                        )}
                        <CTableDataCell scope="row" className="text-center">
                          {currentReportItem.absentCount}
                        </CTableDataCell>
                        <CTableDataCell scope="row" className="text-center">
                          {currentReportItem.lateComingCount === null
                            ? 0
                            : currentReportItem.lateComingCount}
                        </CTableDataCell>
                        <CTableDataCell scope="row" className="text-center">
                          {currentReportItem.casualLeaveCount}
                        </CTableDataCell>
                        <CTableDataCell scope="row" className="text-center">
                          {currentReportItem.lopLeaveCount}
                        </CTableDataCell>
                        <CTableDataCell scope="row" className="text-center">
                          {currentReportItem.holidaysCount}
                        </CTableDataCell>
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
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>
              {employeeAttendanceReport?.length
                ? `Total Records: ${listSize}`
                : `No Records found...`}
            </strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {listSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {listSize > 20 && (
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
    </>
  )
}

export default AttendanceReportTable
