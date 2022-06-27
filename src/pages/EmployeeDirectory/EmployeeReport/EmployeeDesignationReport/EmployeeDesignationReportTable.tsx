import React from 'react'
import { Link } from 'react-router-dom'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { EmployeeDesignationReportTableProps } from '../../../../types/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportTypes'
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

const EmployeeDesignationReportTable = (
  props: EmployeeDesignationReportTableProps,
): JSX.Element => {
  const employeeDesignationReports = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors
      .employeeDesignationReport,
  )
  const selectedDesignation = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.selectedDesignation,
  )

  const listSize = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.listSize,
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
      <CTable className="mt-4" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
            <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department</CTableHeaderCell>
            <CTableHeaderCell scope="col">Blood Group</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Joining</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employeeDesignationReports.length ? (
            <>
              {employeeDesignationReports.map((empDesignation, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{empDesignation.id}</CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/employeeProfile/${empDesignation.id}`}
                        className="employee-name"
                      >
                        {empDesignation.fullName}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>{empDesignation.emailId}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {empDesignation.mobile}
                    </CTableDataCell>
                    <CTableDataCell>
                      {empDesignation.designation}
                    </CTableDataCell>
                    <CTableDataCell>
                      {empDesignation.departmentName}
                    </CTableDataCell>
                    <CTableDataCell>{empDesignation.bloodgroup}</CTableDataCell>
                    <CTableDataCell>
                      {empDesignation.contractStartDate}
                    </CTableDataCell>
                    <CTableDataCell>{empDesignation.country}</CTableDataCell>
                  </CTableRow>
                )
              })}
            </>
          ) : (
            <CRow className="mt-4">
              <h5>No Records Found... </h5>
            </CRow>
          )}
        </CTableBody>
      </CTable>
      {selectedDesignation && (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>
                Total Records: {employeeDesignationReports.length}
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
      )}
    </>
  )
}

export default EmployeeDesignationReportTable
