import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
} from '@coreui/react-pro'
import React from 'react'

const EmployeeAccountsTable = (): JSX.Element => {
  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Employee Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">P.F A/C No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">UAN</CTableHeaderCell>
            <CTableHeaderCell scope="col">Pan Card No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Aadhar Card No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Attachment</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
      </CTable>
    </>
  )
}
export default EmployeeAccountsTable
