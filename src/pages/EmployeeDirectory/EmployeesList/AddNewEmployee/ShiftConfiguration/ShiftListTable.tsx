import {
  CButton,
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
import { ShiftListTableProps } from '../../../../../types/EmployeeDirectory/EmployeeList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'

const ShiftListTable = ({
  employeeShifts,
}: ShiftListTableProps): JSX.Element => {
  console.log(employeeShifts)
  return (
    <>
      <CTable striped responsive className="ps-0 pe-0">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Shift Name</CTableHeaderCell>
            <CTableHeaderCell>Start time</CTableHeaderCell>
            <CTableHeaderCell>End time</CTableHeaderCell>
            <CTableHeaderCell>Grace Period</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employeeShifts?.map((employeeShift, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">
                  {employeeShift.name}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {`${employeeShift.startTimeHour}:${employeeShift.startTimeMinutes}`}
                </CTableDataCell>
                <CTableDataCell scope="row">{`${employeeShift.endTimeHour}:${employeeShift.endTimeMinutes}`}</CTableDataCell>
                <CTableDataCell scope="row">
                  {employeeShift.graceTime}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CButton color="info" className="btn-ovh me-1">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </CButton>
                  <CButton color="danger" className="btn-ovh me-1">
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {employeeShifts.length}</strong>
          </p>
        </CCol>
      </CRow>
    </>
  )
}

export default ShiftListTable
