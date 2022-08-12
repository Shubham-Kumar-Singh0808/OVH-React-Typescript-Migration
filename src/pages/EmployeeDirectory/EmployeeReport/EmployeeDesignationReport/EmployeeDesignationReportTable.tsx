import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCol,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import employeeReportDesignationAPI from '../../../../middleware/api/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportApi'
import { EmployeeDesignationReportTableProps } from '../../../../types/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportTypes'
import { downloadFile } from '../../../../utils/helper'

const EmployeeDesignationReportTable = (
  props: EmployeeDesignationReportTableProps,
): JSX.Element => {
  const employeeDesignationReports = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors
      .employeeDesignationReport,
  )
  const getDesignations = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.designations,
  )
  const selectedDesignation = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.selectedDesignation,
  )

  const listSize = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.listSize,
  )

  const handleExportEmployeeDesignationData = async () => {
    const employeeDesignationList =
      await employeeReportDesignationAPI.exportEmployeeDesignationReport({
        selectedDesignation,
      })
    downloadFile(employeeDesignationList, 'EmployeeDesignationListReport.csv')
  }

  const handleBack = () => {
    window.location.href = '/empReport'
  }

  const {
    designation,
    setDesignation,
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
      <CRow>
        <CCol lg={6}>
          <CRow>
            <CCol sm={4} md={4} lg={4}>
              <CFormLabel className="mt-1">Designation:</CFormLabel>
            </CCol>
            <CCol sm={6} md={6} lg={6} data-testid="designationFilter">
              <CFormSelect
                aria-label="Default select example"
                data-testid="designationSelect"
                name="designation"
                id="designation"
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value)
                }}
              >
                <option value="">Select Designation</option>
                {getDesignations.map((designation, index) => (
                  <option key={index} value={designation.name}>
                    {designation.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg={6} className="gap-2 d-md-flex justify-content-md-end">
          <CRow>
            <CCol data-testid="backBtn">
              <CButton
                data-testid="backButton"
                color="info btn-ovh me-1"
                onClick={handleBack}
                value="back"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="mt-2">
        <CCol
          lg={12}
          className="gap-2 d-md-flex justify-content-end"
          data-testid="exportBtn"
        >
          <CButton
            color="info"
            className="text-white"
            size="sm"
            onClick={handleExportEmployeeDesignationData}
          >
            <i className="fa fa-plus me-1"></i>
            Click to Export Employee List
          </CButton>
        </CCol>
      </CRow>
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
                    <CTableDataCell>{empDesignation.mobile}</CTableDataCell>
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
      )}
    </>
  )
}

export default EmployeeDesignationReportTable
