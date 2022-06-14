import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CCardBody,
  CCol,
  CLink,
  CButton,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'
import { Link } from 'react-router-dom'
const EmployeeReportees = (): JSX.Element => {
  const empID = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const employeeReportees = useTypedSelector(
    reduxServices.employeeReportees.selectors.employeeReportees,
  )

  const employeeReporteesKRAs = useTypedSelector(
    reduxServices.employeeReportees.selectors.employeeReporteesKRAs,
  )

  console.log(employeeReporteesKRAs)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.employeeReportees.getEmployeeReportees(empID))
  }, [dispatch, empID])

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
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Manager</CTableHeaderCell>
              <CTableHeaderCell scope="col">Reportee</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mobile No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Reportee Project Name & Allocation %
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">KRAs</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employeeReportees?.map((reportee, index) => (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">
                  <Link
                    to={`/employeeProfile/${reportee.managerId}`}
                    className="employee-name"
                  >
                    {reportee.managerName}
                  </Link>
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <Link
                    to={`/employeeProfile/${reportee.reporteeId}`}
                    className="employee-name"
                  >
                    {reportee.reporteeName}
                  </Link>
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {reportee.mobile || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {reportee.allcoationDetails || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CLink className="cursor-pointer text-decoration-none text-primary">
                    Click for KRAs
                  </CLink>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {employeeReportees.length}</strong>
          </p>
        </CCol>
      </CCardBody>
    </>
  )
}
export default EmployeeReportees
