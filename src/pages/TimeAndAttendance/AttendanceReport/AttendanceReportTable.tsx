import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import {
  AttendanceReportTableProps,
  AttendanceStatusCheckProps,
} from '../../../types/TimeAndAttendance/AttendanceReport/attendanceReportTypes'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const AttendanceReportTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  isBiometric,
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

  const attendanceStatusCheck = ({
    status,
    textColor,
    title,
    lateReport,
    biometric,
  }: AttendanceStatusCheckProps) => {
    if (status === 'P' && biometric !== 'WithBiometric') {
      return <i className="fa fa-check sh-attendance-icon-check"></i>
    } else if (status === 'P' && lateReport && biometric === 'WithBiometric') {
      return <span className="sh-span-red">{title}</span>
    } else if (
      status === 'P' &&
      lateReport === false &&
      biometric === 'WithBiometric'
    ) {
      return <span className="sh-span-black">{title}</span>
    } else if (status === 'A' && title === 'Absent') {
      return <i className="fa fa-times sh-attendance-icon-times"></i>
    } else if (
      status === 'A' &&
      (title === 'C' || title === 'L' || title === 'P')
    ) {
      return <span style={{ color: textColor }}>{title}</span>
    } else if (status === 'A' && title === 'H') {
      return <span className="sh-span-orange">{title}</span>
    } else {
      return <span className="sh-span-blue">-</span>
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
        className="ps-0 pe-0 attendance-report-table mt-1"
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
        {isLoading !== ApiLoadingState.loading ? (
          <CTableBody>
            {employeeAttendanceReport.map((currentReportItem, reportIndex) => {
              return (
                <React.Fragment key={reportIndex}>
                  <CTableRow>
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
                            {isBiometric === 'WithBiometric' ? (
                              <>
                                <CTableDataCell
                                  scope="row"
                                  className="text-center"
                                >
                                  {attendanceStatusCheck({
                                    status: bioAttendanceItem.attendanceStatus,
                                    textColor: bioAttendanceItem.color,
                                    title: bioAttendanceItem.title,
                                    lateReport: bioAttendanceItem.lateReport,
                                    biometric: isBiometric,
                                  })}
                                </CTableDataCell>
                              </>
                            ) : (
                              <>
                                <CTableDataCell
                                  scope="row"
                                  className="text-center"
                                >
                                  {attendanceStatusCheck({
                                    status: bioAttendanceItem.attendanceStatus,
                                    textColor: bioAttendanceItem.color,
                                    title: bioAttendanceItem.title,
                                  })}
                                </CTableDataCell>
                              </>
                            )}
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
                </React.Fragment>
              )
            })}
          </CTableBody>
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </CTable>
      {isLoading !== ApiLoadingState.loading && (
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
                options={[20, 40, 60, 80, 100]}
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
      )}
    </>
  )
}

export default AttendanceReportTable
