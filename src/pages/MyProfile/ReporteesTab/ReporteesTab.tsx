import { CCardHeader, CRow, CCol, CButton } from '@coreui/react-pro'

import React from 'react'
import EmployeeReportees from './EmployeeReportees'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
const ReporteesTab = (): JSX.Element => {
  const [isViewingAnotherEmployee] = useSelectedEmployee()
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
        <h4 className="h4">Reportees List</h4>
      </CCardHeader>
      <br />
      <EmployeeReportees />
    </>
  )
}

export default ReporteesTab
