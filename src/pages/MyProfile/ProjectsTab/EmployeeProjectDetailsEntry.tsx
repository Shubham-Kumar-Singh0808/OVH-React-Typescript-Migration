import { CTableRow, CTableDataCell } from '@coreui/react-pro'
import { EmployeeProjectDetailsEntryInterface } from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import React from 'react'

const EmployeeProjectDetailsEntry = (
  props: EmployeeProjectDetailsEntryInterface,
): JSX.Element => {
  return (
    <CTableRow>
      <CTableDataCell scope="row">{props.id}</CTableDataCell>
      <CTableDataCell scope="row">
        {props.projectDetails.empFirstName +
          ' ' +
          props.projectDetails.empLastName}
      </CTableDataCell>
      <CTableDataCell scope="row">
        {props.projectDetails.desigination}
      </CTableDataCell>
      <CTableDataCell scope="row">
        {props.projectDetails.allocation}
      </CTableDataCell>
      <CTableDataCell scope="row">
        {props.projectDetails.endDate}
      </CTableDataCell>
      <CTableDataCell scope="row">
        {props.projectDetails.billable ? 'Yes' : 'No'}
      </CTableDataCell>
      <CTableDataCell scope="row">
        {props.projectDetails.isAllocated ? 'Allocated' : 'Not Allocated'}
      </CTableDataCell>
    </CTableRow>
  )
}

export default EmployeeProjectDetailsEntry
