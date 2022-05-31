import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import React from 'react'

const ShiftListTable = (): JSX.Element => {
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
          <CTableRow>
            <CTableDataCell scope="row"></CTableDataCell>
            <CTableDataCell scope="row"></CTableDataCell>
            <CTableDataCell scope="row"></CTableDataCell>
            <CTableDataCell scope="row"></CTableDataCell>
            <CTableDataCell scope="row"></CTableDataCell>
            <CTableDataCell scope="row">
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </CButton>
              <CButton color="danger" className="btn-ovh me-1">
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default ShiftListTable
