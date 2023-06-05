import React from 'react'
import { Link } from 'react-router-dom'
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
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { EmployeeReportTableProps } from '../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'

const EmployeeReportTable = (props: EmployeeReportTableProps): JSX.Element => {
  const employeeReports = useTypedSelector(
    reduxServices.employeeReports.selectors.employeesReport,
  )
  const listSize = useTypedSelector(
    reduxServices.employeeReports.selectors.listSize,
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
      {employeeReports.length ? (
        <>
          <CTable className="mt-4" striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {employeeReports.map((employee, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{employee.id}</CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/employeeProfile/${employee.id}`}
                        className="employee-name"
                        data-testid={`employee-profile-link${index}`}
                      >
                        {employee.fullName}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>{employee.emailId}</CTableDataCell>
                    <CTableDataCell>{employee.mobile}</CTableDataCell>
                    <CTableDataCell>{employee.country}</CTableDataCell>
                  </CTableRow>
                )
              })}
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
      ) : (
        <CRow className="mt-4">
          <h5>No Records Found... </h5>
        </CRow>
      )}
    </>
  )
}

export default EmployeeReportTable
