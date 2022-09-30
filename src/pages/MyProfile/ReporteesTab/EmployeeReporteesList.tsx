import { CRow, CCol, CButton, CCardHeader, CCardBody } from '@coreui/react-pro'
import React from 'react'
import EmployeeReportessTable from './EmployeeReportessTable'

const EmployeeReporteesList = (): JSX.Element => {
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton color="info btn-ovh me-1" className="text-white" size="sm">
            <i className="fa fa-plus me-1"></i>Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CCardHeader>
        <h4 className="h4">Manager Reportees</h4>
      </CCardHeader>
      <CCardBody>
        <EmployeeReportessTable />
      </CCardBody>
    </>
  )
}

export default EmployeeReporteesList
