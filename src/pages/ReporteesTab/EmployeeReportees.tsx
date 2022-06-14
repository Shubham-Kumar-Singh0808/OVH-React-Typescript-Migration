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
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'
const EmployeeReportees = (): JSX.Element => {
  const empID = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeReportees = useTypedSelector(
    reduxServices.employeeReportees.selectors.employeeReportees,
  )
  console.log(employeeReportees)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.employeeReportees.getEmployeeReportees(empID))
  }, [dispatch, empID])

  return (
    <>
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
                  {reportee.managerName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {reportee.reporteeName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {reportee.mobile || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {reportee.allcoationDetails || 'N/A'}
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
