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
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { ManagerTimeInOfficeReportProps } from '../../../types/TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportTypes'

const ManagerTimeInOfficeReport = (
  props: ManagerTimeInOfficeReportProps,
): JSX.Element => {
  const timeInOfficeManagerReport = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.timeInOfficeManagerReport,
  )
  const listSize = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.managerReportSize,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      {timeInOfficeManagerReport.list.length ? (
        <>
          <CTable striped className="time-in-office-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                {timeInOfficeManagerReport.dayList.map((value, index) => {
                  return (
                    <CTableHeaderCell key={index} scope="col">
                      {value}
                    </CTableHeaderCell>
                  )
                })}
                <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {timeInOfficeManagerReport.list.map(
                (employeeRecord, employeeRecordIndex) => {
                  return (
                    <CTableRow key={employeeRecordIndex}>
                      <CTableDataCell>{employeeRecord.empID}</CTableDataCell>
                      <CTableDataCell>{employeeRecord.empName}</CTableDataCell>
                      {employeeRecord.inOfficeDTOs.map((value, index) => {
                        return (
                          <CTableDataCell
                            key={index}
                            className={`color-for-time-${value.colorForTime}`}
                          >
                            {value.spentHours}
                          </CTableDataCell>
                        )
                      })}
                      <CTableDataCell className="color-for-time-total">
                        {employeeRecord.totalTimeInOfficeHours}
                      </CTableDataCell>
                    </CTableRow>
                  )
                },
              )}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {listSize}</strong>
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
        </>
      ) : (
        <CRow className="mt-4">
          <h5>No Records Found... </h5>
        </CRow>
      )}
    </>
  )
}

export default ManagerTimeInOfficeReport
