import { CRow, CCol, CButton, CCardHeader, CCardBody } from '@coreui/react-pro'
import React from 'react'
import EmployeeReporteesTable from './EmployeeReporteesTable'
import employeeReporteesApi from '../../../middleware/api/MyProfile/ReporteesTab/employeeReporteesApi'
import { downloadFile } from '../../../utils/helper'

const EmployeeReportees = (): JSX.Element => {
  const handleExportBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const employeeList = await employeeReporteesApi.exportReporteeList()
    downloadFile(employeeList, 'ReporteeList.csv')
  }
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info btn-ovh me-1"
            className="text-white"
            size="sm"
            onClick={handleExportBtn}
          >
            <i className="fa fa-plus me-1"></i>Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CCardHeader>
        <h4 className="h4">Manager Reportees</h4>
      </CCardHeader>
      <CCardBody>
        <EmployeeReporteesTable />
      </CCardBody>
    </>
  )
}

export default EmployeeReportees
